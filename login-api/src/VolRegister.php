<?php
class VolRegister extends Endpoint
{
    private $sqlVolunteer = "INSERT INTO VolunteerLogin (email, passwordHash) VALUES (:email, :passwordHash)";
    private $sqlCheckEmail = "SELECT COUNT(*) AS count FROM VolunteerLogin WHERE email = :email";
    private $sqlParams = [];

    public function __construct()
    {
        switch (Request::method()) {
            case 'POST':
                $responseData = $this->registerUser(); // Register the user and get response data
                parent::__construct($responseData); // Pass the response data to parent constructor
                break;
            default:
                throw new ClientError(405);
                break;
        }
    }

    private function registerUser()
    {   
        // Retrieve email and password from Authorization Headers
        $email = $_SERVER['PHP_AUTH_USER'] ?? '';
        $password = $_SERVER['PHP_AUTH_PW'] ?? '';

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new ClientError(400, 'Invalid email format');
        }

        // Check password length
        if (strlen($password) < 8) {
            throw new ClientError(400, 'Password must be at least 8 characters long');
        }

        $dbConn = new Database(USER_DATABASE);

        // Check if the email is already registered
        $result = $dbConn->executeSQL($this->sqlCheckEmail, [':email' => $email]);
        if ($result[0]['count'] > 0) {
            throw new ClientError(400, 'Email is already registered');
        }

        // Hash the password
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Insert the user into the database
        $sql = $this->sqlVolunteer;
        $this->sqlParams = [
            ':email' => $email,
            ':passwordHash' => $passwordHash
        ];
        $dbConn->executeSQL($sql, $this->sqlParams);

        // Generate JWT token for the registered user
        $userId = $dbConn->getLastInsertId(); // Assuming this method is available in Database class
        $token = $this->generateJWT($userId);

        // Construct the response data
        $responseData = [
            'message' => 'Registration successful',
            'token' => $token
        ];

        return $responseData;
    } 

    /**
     * Generate a JWT token based on the user's ID.
     *
     * @param int $id The user's ID.
     *
     * @return string The generated JWT token.
     */
    private function generateJWT($id)
    {
        $secretKey = SECRET;
        $iat = time();

        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $id,
            'exp' => strtotime('+1 day', $iat),
        ];

        $jwt = Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');

        return $jwt;
    } 
}
