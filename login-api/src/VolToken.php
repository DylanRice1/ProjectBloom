<?php

/**
 * Class VolToken
 *
 * Represents an endpoint for generating JWT tokens based on user credentials.
 * 
 *  @param array $sqlParams SQL query parameters.
 * @param string $sql SQL query to retrieve user information based on email.
 * @author Dhruv Thota
 */
class VolToken extends Endpoint
{
    
    private $sql = "SELECT id, passwordHash FROM VolunteerLogin WHERE email = :email";
    private $sqlParams = [];

    /**
     * Token constructor.
     *
     * Validates the request method (GET or POST), performs authentication,
     * generates a JWT token, and constructs the response.
     *
     * @throws ClientError If authentication fails or the request method is not allowed.
     */
    public function __construct()
    {
        // @todo 2. check the request method is GET or POST
        switch (Request::method()) {
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();
                $dbConn = new Database(USER_DATABASE);

                // Perform basic HTTP authentication
                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new ClientError(401);
                }
                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new ClientError(401);
                }

                // Retrieve user information based on email
                $this->sqlParams[":email"] = $_SERVER['PHP_AUTH_USER'];
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);

                // Check if exactly one user is found
                if (count($data) != 1) {
                    throw new ClientError(401);
                }

                // Verify the provided password
                if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['passwordHash'])) {
                    throw new ClientError(401);
                }

                // Generate and return a JWT token
                $token = $this->generateJWT($data[0]['id']);
                $data = ['token' => $token];

                parent::__construct($data);
                break;
            default:
                throw new ClientError(405);
                break;
        }
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
