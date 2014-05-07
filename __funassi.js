/* ********************************************

	ワールドの状態管理をするスクリプト

	戦車をランダムに出現させる

********************************************* */	
#pragma strict

// ランダムの数値を保持
var t : int=0;

//乱数の上限と下限 変更しちゃダメ！
var start : int = 1;
var end : int = 4;

// 見ての通り
var GuardTank : GameObject;
var NormalTank: GameObject;
var StrongerTank : GameObject;



function Start () {
	// まず最初にスポーン
	spawnTank();
}

function Update () {

	// ３種類の戦車が存在しなかったら
	// 大人数だと壊れる。
	if ((GameObject.Find("GuardTank(Clone)") == null) && (GameObject.Find("NormalTank(Clone)") == null) && (GameObject.Find("StrongerTank(Clone)") == null)) {
  		spawnTank();
  	}
}


function spawnTank (){
	var spawnarea = transform.Find('/funassi/spawn');
	// 1~3までのランダム数値
	//t = Random.Range(start, end);
	t=2;
	if(t == 1) {
		Instantiate(GuardTank, spawnarea.position, spawnarea.rotation);
		Debug.Log("Guard");
	} else if(t == 2) {
		Instantiate(NormalTank, spawnarea.position, spawnarea.rotation);
		Debug.Log("Normal");
	} else if(t == 3) {
		Instantiate(StrongerTank, spawnarea.position, spawnarea.rotation);
		Debug.Log("Strong");
	}
}