<?php
require_once "Controller.php";
require_once "Repository/UserRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class UserController extends Controller {

    private UserRepository $clients;

    public function __construct(){
        $this->clients = new UserRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id){

            $p = $this->clients->find($id);
            return $p==null ? false :  $p;
        }

    }

    protected function processPostRequest(HttpRequest $request) {
       $idaction = $request->getId();

       if($idaction == "signup"){
        return $this->processSignUpRequest($request);
       }
       if($idaction == "signin"){
        return $this->processSignInRequest($request);
       }
       if($idaction == "signout"){
        return $this->processSignOutRequest($request);
       }
    }
    private function processSignUpRequest(HttpRequest $request){
        $firstname = $request->getParam("firstname");
        $name = $request->getParam("name");
        $email = $request->getParam("email");
        $password = $request->getParam("password");

        $user = $this->users->addNewUser($firstname, $name, $email, $password);
        if($user != null){
            return false;
        }
        $hash_password = password_hash($password, PASSWORD_DEFAULT);

        $userdata= [];
        $userdata["email"] = $email;
        $userdata["password"] = $hash_password;
        $userdata["name"] = $request->getParam("name");
        $userdata["firstname"] = $request->getParam("firstname");
        $user = new User($userdata);

        return $this->users->save($user);
    }
    private function processSignInRequest(HttpRequest $request){

        $email = $request->getParam("email");
        $password = $request->getParam("password");
    
        $user = $this->users->finByEmail($email);
        if($user != null){
            return false;
        }
        $hash_password = password_hash($password, PASSWORD_DEFAULT);
    
        $userdata= [];
        $userdata["email"] = $email;
        $userdata["password"] = $hash_password;
        $userdata["name"] = $request->getParam("name");
        $userdata["firstname"] = $request->getParam("firstname");
        $user = new User($userdata);
    
        return $this->users->save($user);
    }
    
    
}

?>