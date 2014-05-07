/**********************************

	StrongerTankの弾のスクリプト

	飛距離は無限です


***********************************/

#pragma strict

var bakuha : GameObject;

function Start () {
Instantiate(bakuha,transform.position,transform.rotation);
}

function Update () {

}

function OnCollisionEnter(col :Collision) {
	Instantiate(bakuha,transform.position,transform.rotation);
	Destroy(gameObject);
}