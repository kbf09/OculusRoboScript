/************************************************************


	普通の戦車を定義するスクリプト
	0.5秒ずづらい弾を普通に出します
	飛距離はtama.jsで管理してます	


*************************************************************/


#pragma strict
//ここで銃弾プレハブを入れる変数を作っておく
var tama:GameObject;
//var bakuha:GameObject;
// 時間計測につかいます
var t :float = 0;

function Start () {

}

function Update () {
// テストスクリプト１	
	if( Input.GetButton("Fire1")) {

		// 時間計測
		t += Time.deltaTime;
		// Debug.Log(t);

		// 0.5秒ずつ
		if (t >= 0.5) {
	
            //銃の発射口のオブジェクトを変数に入れる
        	//if (t%0.2 == 0) {
	       		var muzzle = transform.Find('/NormalTank(Clone)/muki');

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