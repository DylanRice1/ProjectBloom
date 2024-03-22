<?php
 
/**
 * Note endpoint
 * 
 * For a get request, it returns all notes 
 * for a user unless a content_id is specified, in which case it returns the note for that film. 
 * 
 * For a post request, it updates the note for a film. 
 * 
 * For a delete request, it deletes the note for a film. 
 * 
 * 
 * @author Dhruv Thota
 */
class Notes extends Endpoint 
{
    public function __construct()
    {
        $id = $this->validateToken();
        
        $this->checkUserExists($id);
 
        switch(Request::method()) 
        {
            case 'GET':
                $data = $this->getNote($id);
                break;
            case 'POST':
            case 'PUT':
                $data = $this->postNote($id);
                break;
            case 'DELETE':
                $data = $this->deleteNote($id);
                break;
            default:
                throw new ClientError(405);
                break;
        }
        parent::__construct($data);
    }
 
  
    private function validateToken()
    {
        $secretkey = SECRET;
                
        $jwt = REQUEST::getBearerToken();
 
        try {
            $decodedJWT = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
        } catch (\Exception $e) {
            throw new ClientError(401);
        }
 
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->sub)) { 
            throw new ClientError(401);
        }
 
        return $decodedJWT->sub;
    }
 
    /**
     * Check the note exists and do some basic validation
     */
    private function note() 
    {
        if (!isset(REQUEST::params()['notes']))
        {
            throw new ClientError(422);
        }
 
        if (mb_strlen(REQUEST::params()['notes']) > 255)
        {
            throw new ClientError(422);
        }
 
       $note = REQUEST::params()['notes'];
       return htmlspecialchars($note);
    }
 
    /**
     * Get all notes for a user unless a content_id is specified, in which case
     * it returns the note for that specific film.
     */
    private function getNote($id)
    {
        // If a content_id is specified, return the note for that film
        // otherwise return all notes for the user.
        if (isset(REQUEST::params()['content_id']))
        {
            $content_id = REQUEST::params()['content_id'];
 
            if (!is_numeric($content_id))
            {
                throw new ClientError(422);
            }
 
            $sql = "SELECT * FROM notes WHERE user_id = :id AND content_id = :content_id";
            $sqlParams = [':id' => $id, 'content_id' => $content_id];
        } else {
            $sql = "SELECT * FROM notes WHERE user_id = :id";
            $sqlParams = [':id' => $id];
        }
 
        $dbConn = new Database(USER_DATABASE);
        
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }
 
    /**
     * This handles both posting a new note and updating an existing note
     * for a film. There can only be one note per film per user.
     */
    private function postNote($id)
    {
        // Check if 'notes' and 'content_id' are set in the request parameters
        if (!isset(REQUEST::params()['notes']) || !isset(REQUEST::params()['content_id'])) {
            throw new ClientError(422);
        }
    
        $content_id = REQUEST::params()['content_id'];
    
        // Validate if 'content_id' is numeric
        if (!is_numeric($content_id)) {
            throw new ClientError(422);
        }
    
        // Validate and sanitize the note
        $note = REQUEST::params()['notes'];
        $note = $this->note();
    
        // Check if the content_id exists in the database
        $dbConnContent = new Database(CONTENT_DATABASE);
        $contentCheckSQL = "SELECT COUNT(*) as count FROM content WHERE id = :content_id";
        $contentCheckParams = [':content_id' => $content_id];
        $contentCheckResult = $dbConnContent->executeSQL($contentCheckSQL, $contentCheckParams);
    
        if ($contentCheckResult[0]['count'] === 0) {
            // If content_id does not exist, throw an error
            throw new ClientError(422, "Content with ID $content_id does not exist.");
        }
    
        // Check if there is an existing note for this film
        $dbConn = new Database(USER_DATABASE);
        $noteCheckSQL = "SELECT * FROM notes WHERE user_id = :id AND content_id = :content_id";
        $noteCheckParams = [':id' => $id, 'content_id' => $content_id];
        $existingNote = $dbConn->executeSQL($noteCheckSQL, $noteCheckParams);
    
        // If there is no note for this film, create one. Otherwise, update the existing note.
        if (count($existingNote) === 0) {
            $sql = "INSERT INTO notes (user_id, content_id, notes) VALUES (:id, :content_id, :notes)";
        } else {
            $sql = "UPDATE notes SET notes = :notes WHERE user_id = :id AND content_id = :content_id";
        }
    
        // Execute the SQL query to insert or update the note
        $sqlParams = [':id' => $id, 'content_id' => $content_id, 'notes' => $note];
        $data = $dbConn->executeSQL($sql, $sqlParams);
    
        return [];
    }
    
 
 
    /**
     * Delete a note for a film. This method is not strictly necessary as
     * the postNote method can be used to 'delete' a note by setting the note
     * to an empty string.
     */
    private function deleteNote($id)
    {
        if (!isset(REQUEST::params()['content_id']))
        {
            throw new ClientError(422);
        }
 
        $content_id = REQUEST::params()['content_id'];
        
        if (!is_numeric($content_id))
        {
            throw new ClientError(422);
        }
 
        $dbConn = new Database(USER_DATABASE);
        $sql = "DELETE FROM notes WHERE user_id = :id AND content_id = :content_id";
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }
 
    private function checkUserExists($id)
    {
        $dbConn = new Database(USER_DATABASE);
        $sql = "SELECT id FROM account WHERE id = :id";
        $sqlParams = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        if (count($data) != 1) {
            throw new ClientError(401);
        }
    }
}

