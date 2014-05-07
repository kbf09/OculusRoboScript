var healthBarFull : Texture2D;
var healthBarEmpty : Texture2D;
static var barDisplay : float = 0;
static var damage : float =0.1;
function OnGUI (){
        GUI.BeginGroup(new Rect(300,Screen.height/2 +50,20,300));
        GUI.Box (Rect (0,0, 20, 300),healthBarFull);
    
           GUI.BeginGroup (new Rect (0, 0, 20, 300 * barDisplay)); //barDisplayが0.1なら300の10%がダメージとなり塗りつぶされる
           GUI.Box (Rect (0,0, 20, 300),healthBarEmpty);
           GUI.EndGroup ();
        GUI.EndGroup ();
}

function Update () {
 
}

function OnControllerColliderHit (hit : ControllerColliderHit){
	if(hit.collider.gameObject.name == "tama(Clone)"){
		barDisplay += damage;
		Debug.Log(barDisplay);
		Destroy(hit.gameObject);
	}
}