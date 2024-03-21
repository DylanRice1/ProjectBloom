<?php
class VolRegister extends Endpoint
{
    private $sql = "INSERT INTO VolunteerLogin (email, passwordHash) VALUES (:email, :passwordHash)";

    public function __construct()
    {
        switch (Request::method()) {
            case 'POST':
                $this->checkAllowedParams();

                // Validate email format
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new ClientError('Invalid email format');
                }

                // Validate password length
                $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
                if (strlen($password) < 8) {
                    throw new ClientError('Password must be at least 8 characters long');
                }

                // Hash the password
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);

                // Insert user data into the database
                $dbConn = new Database(USER_DATABASE);
                $sqlParams = [':email' => $email, ':passwordHash' => $passwordHash];
                $dbConn->executeSQL($this->sql, $sqlParams);

                // Generate and return a JWT token
                $token = $this->generateJWT($email);
                $data = ['message' => 'User registered successfully', 'token' => $token];
                parent::__construct($data);
                break;
            default:
                throw new ClientError(405);
                break;
        }
    }

    private function generateJWT($email)
    {
        $secretKey = SECRET;
        $iat = time();

        // You can use email as a unique identifier for the JWT payload
        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $email,
            'exp' => strtotime('+1 day', $iat),
        ];

        $jwt = Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
    }
}
