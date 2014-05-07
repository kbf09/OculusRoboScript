/************************************************************


	NormalTnakの弾についているスクリプト

	飛距離は２秒間です


*************************************************************/
#pragma strict

var bakuha : GameObject;
var t : double;

function Start () {
	// まず爆破エフェクト
Instantiate(bakuha,transform.position,transform.rotation);
}

function Update () {
	// 時間を測ってデストロイ
	t += Time.deltaTime;
	if (t > 2) {
		tamaDestroy();
		t = 0.0;
	}

}

function OnCollisionEnter(col :Collision) {
	// 何かにあたってもデストロイ
	tamaDestroy();
}

function tamaDestroy() {
	Instantiate(bakuha,transform.position,transform.rotation);
	Destroy(gameObject);
}