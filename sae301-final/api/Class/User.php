<?php
/**
 *  Class Client
 * 
 *  Représente un client avec les propriétés id_client, first_name, name, email, passwd
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Client doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class User implements JsonSerializable {
    private int $id_client; // id du client
    private string $first_name; // prénom du client
    private string $name; // nom du client
    private string $email; // email du client
    private string $passwd; // mot de passe du client

    public function __construct(int $id_client){
        $this->id_client = $id_client;
    }

    /**
     * Get the value of id_client
     */ 
    public function getIdClient(): int
    {
        return $this->id_client;
    }

    /**
     *  Define how to convert/serialize a Client to a JSON format
     *  This method will be automatically invoked by json_encode when apply to a Client
     */
    public function jsonSerialize(): mixed {
        return [
            "id_client" => $this->id_client,
            "first_name" => $this->first_name,
            "name" => $this->name,
            "email" => $this->email,
            "passwd" => $this->passwd
        ];
    }

    /**
     * Get the value of first_name
     */ 
    public function getFirstName(): string
    {
        return $this->first_name;
    }

    /**
     * Set the value of first_name
     *
     * @return  self
     */ 
    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;
        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get the value of passwd
     */ 
    public function getPasswd(): string
    {
        return $this->passwd;
    }

    /**
     * Set the value of passwd
     *
     * @return  self
     */ 
    public function setPasswd(string $passwd): self
    {
        $this->passwd = $passwd;
        return $this;
    }
}
