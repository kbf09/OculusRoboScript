using UnityEngine;
using System;
using System.Collections;
using WebSocketSharp;
using System.Collections.Generic;
using MiniJSON;

public class OculusSend : MonoBehaviour {

	/**************************************************
	 * 
	 * 送信側変数宣言
	 * 
	 * **************************************************/

	public GameObject tama;
	public float t;
	public int tamashot;
	// 15フレームで送信するために使うフラグ
	int sendflg = 0;
	public string ipaddress = "ws://10.17.200.12:8080";
    GameObject CameraRight;



	/***********************************
	 * 
	 * 受信側変数宣言
	 * 
	 * *********************************/

	// 受信生データ
	public string s = null;

	WebSocket ws;

	//　ただの座標
	public double x;
	public double y;
	public double z;

	//　ローテーションに使ってる
	public double rox;
	public double roy;
	public double roz;

	// jsonをパースした結果を格納する連想配列
    Dictionary<string, object> jsonData;

	public bool flag = false;

	// タンクを格納する２次元配列
    Dictionary<string, GameObject> tank = new Dictionary<string, GameObject>();
    int cnt = 0;

	public GameObject prefab;


	// Use this for initialization
	void Start () {
        Connect();
        CameraRight = GameObject.Find("/Player/Camera/CameraRight");

		// 本当はココの中に座標移動のスクリプトを書いていくのだろうけど
		// 別スレッドとか意味わかんないからドンマイ
		ws.OnMessage += (sender, e) => {
			s = e.Data;
			flag = true;
		};
	}
	
    

	// Update is called once per frame
	void FixedUpdate () {

		if (sendflg % 2 == 0) {
            SendChatMessage();
		}
		sendflg = (sendflg + 1) % 2;

		if( Input.GetButton("Fire1")) {
			shot("Oculus");
			ws.Send("{\"me\":\"Oculus\",\"shot\":\"1\"}");
		}
		Move();
	}


    void Connect()
    {
        ws = new WebSocket(ipaddress);
        ws.Connect();
    }
    
	// 送信
    void SendChatMessage()
    {

        // 座標取得(小数第3位きりすて)
        string imakokox = ((int)(this.transform.position.x*100+1)/100.0).ToString();
        string imakokoy = ((int)(this.transform.position.y*100)/100.0).ToString();
        string imakokoz = ((int)(this.transform.position.z*100+1)/100.0).ToString();
        
        //　Oculus側はYの値だけで回転することが可能。もしかしたら受け取る側で差分回転するように
        //　する必要があるかもしれない。  

		string rox = ((int)(CameraRight.transform.localEulerAngles.x*1000+1)/1000.0).ToString();
		string roy = ((int)(this.transform.localEulerAngles.y*1000+1)/1000.0).ToString();
		string roz = ((int)(this.transform.rotation.z*100+1)/100.0).ToString();

        //　{"me":"Oculus","x":floatX,"y":floatY,"z":floatZ,"rox":floatROX,"roy":floatROY,"shot":0or1}

        ws.Send("{\"me\":\"Oculus\",\"x\":" + imakokox + ",\"y\":" + imakokoy + ",\"z\":" + imakokoz + ",\"rox\":" + rox + ",\"roy\":" + roy + ",\"roz\":" + roz + ",\"shot\":\"0\"}");

    }


	public void  shot (string a){

		// 時間計測
		t += Time.deltaTime;

		// 0.5f秒ずつ
		//if (t >= 0.5f) {
			Transform muzzle;
			Transform tmp;

			//銃の発射口のオブジェクトを変数に入れる
			if (a == "Oculus") {
				// Oculusが発射したら
				muzzle = transform.Find("/Player/Camera/CameraRight/muki");
                tmp = transform.Find("/Player/Camera/CameraRight");
			} else {
				// Androidが発射したら
				muzzle = transform.Find("/"+a+"/muki");
				tmp = transform.Find("/"+a);
			}
            
            //銃の発射口に弾丸オブジェクトをインスタンス化
				GameObject bul = (GameObject)Instantiate(tama,muzzle.position,muzzle.rotation);

				//銃の発射口から銃のポジションを引いて飛ばす方向を作る
				Vector3 direction= (muzzle.position - tmp.position).normalized;
				bul.rigidbody.velocity = direction*50;
		
			// 時間初期化
			t = 0.0f;

		//}
	}


	//
	// 確実にデータをsに入れてから処理をしたいためフラグを使ってやってる
	//
	void Move() {

		if (s != null && flag == true) {
			//try {

				jsonData = MiniJSON.Json.Deserialize(s) as Dictionary<string, object>;

				string a = (string)jsonData["me"];

                if (!tank.ContainsKey(a) && cnt < 20)
                {
					GameObject tmp2 = Instantiate(prefab) as GameObject;
					tmp2.name = a;
					tank[a] = tmp2;
                    cnt++;
				}

				string imax = jsonData["shot"].ToString();

				if (imax == "1") {
					shot(a);
				}

				if (a != "Oculus" && imax == "0") {

					//データの取得
					x = (double)jsonData["x"];
					z = (double)jsonData["z"];

					roy = (double)jsonData["roy"];

					tank[a].transform.localPosition = new Vector3((float)x, 0.5f, (float)z);
					tank[a].transform.rotation = Quaternion.Euler(1.0f, (float)roy, 1.0f);
				}
			//}
			//catch {

			//}
		}
	}
}
