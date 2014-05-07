#pragma strict

// バリアの衝突回数を数える
var cnt : int = 0;


function Start () {

}

function Update () {
	if(cnt > 10) {
		Destroy(gameObject);
	}
}

function OnCollisionEnter (col:Collision) {
	
	if(col.gameObject.name == "tamaPrefab(Clone)") {
		//Debug.Log(col.gameObject.name);
		Destroy(col.gameObject);
		cnt+=1;
	}
}