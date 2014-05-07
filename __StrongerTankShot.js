/************************************************************

	強い戦車のスクリプト

	ただ弾を出しているだけ
	何かしらこれから機能をつけるかもね

	弾の飛距離はtamastrong.jsで管理


*************************************************************/

#pragma strict
//ここで銃弾プレハブを入れる変数を作っておく
var tama:GameObject;
//var bakuha:GameObject;
// 時間計測につかいます
var t :float = 0;

// ３発の判定に使います
var cnt :int = 0;

function Start () {

}

function Update () {
// テストスクリプト１	
	if( Input.GetButton("Fire1")) {

		// 時間計測
		t += Time.deltaTime;
		// Debug.Log(t);

		// 0.5秒ずつ
		if (t >= 1) {
	
            //銃の発射口のオブジェクトを変数に入れる
        	//if (t%0.2 == 0) {
	       		var muzzle = transform.Find('/StrongerTank(Clone)/muki');

	            //銃の発射口に弾丸オブジェクトをインスタンス化
				var bul : GameObject = Instantiate(tama,muzzle.position,muzzle.rotation);

	            //銃の発射口から銃のポジションを引いて飛ばす方向を作る
				var direction = (muzzle.position - transform.position).normalized;
				bul.rigidbody.velocity = direction * 50;
			//}
		
			// 時間初期化
			t = 0.0;

		}
	}
}