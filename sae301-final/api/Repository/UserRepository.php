<?php

require_once("Repository/EntityRepository.php");
require_once("Class/User.php");


/**
 *  Classe ProductRepository
 * 
 *  Cette classe représente le "stock" de Product.
 *  Toutes les opérations sur les Product doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class UserRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id_client): ?client {
        $requete = $this->cnx->prepare("select * FROM `Client` WHERE id_client= :value"); // prepare la requête SQL
        $requete->bindParam(':value', $id_client); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $c = new Client($answer->id_client);
        $c->setFirstName($answer->firstname);
        $c->setName($answer->name);
        $c->setEmail($answer->email);
        $c->setPasswd($answer->password);

        return $c;
    }
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Client");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $c = new Client($obj->id_client);
            $c->setFirstName($obj->firstname);
            $c->setName($obj->name);
            $c->setEmail($obj->email);
            $c->setPasswd($obj->password);

            array_push($res, $c);
        }
       
        return $res;
    }

    public function findByEmail(): array {
        $requete = $this->cnx->prepare("select * from Client where email = :email");
        $requete->bindParam(':email', $email);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $c = new Client($obj->id_client);
            $c->setFirstName($obj->firstname);
            $c->setName($obj->name);
            $c->setEmail($obj->email);
            $c->setPasswd($obj->password);

            array_push($res, $c);
        }
       
        return $res;
    }
    
    public function addNewUser($firstname, $name, $email, $password): bool {
        $requete = $this->cnx->prepare("INSERT INTO Client (firstname, name, email, password) VALUES (:firstname, :name, :email, :password)");
        $requete->bindParam(':firstname', $firstname);
        $requete->bindParam(':name', $name);
        $requete->bindParam(':email', $email);
        $requete->bindParam(':password', $password);
        
        return $requete->execute();
    }



    public function deleteClient($id_client): bool {
        $requete = $this->cnx->prepare("DELETE FROM Client WHERE id_client = :id_client");
        $requete->bindParam(':id_client', $id_client);
        
        return $requete->execute();
    }
    
}