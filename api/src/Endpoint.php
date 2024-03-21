<?php

/**
 * Endpoint Class
 *
 * Parent class to all endpoints.
 *
 * @param mixed $data Data associated with the endpoint.
 * 
 * @param array $allowedParams Allowed parameters for the endpoint.
 * 
 * @author Dhruv Thota
 */
class Endpoint
{
    /**
     * Data associated with the endpoint.
     *
     * @var mixed
     */
    private $data;

    /**
     * Allowed parameters for the endpoint.
     *
     * @var array
     */
    protected $allowedParams = [];

    /**
     * Endpoint constructor.
     *
     * Initializes the endpoint with provided data, which defaults to an empty array.
     *
     * @param mixed $data Data associated with the endpoint.
     */
    public function __construct($data = ["message" => []])
    {
        $this->setData($data);
    }

    /**
     * Set data associated with the endpoint.
     *
     * @param mixed $data Data to be associated with the endpoint.
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * Get data associated with the endpoint.
     *
     * @return mixed Data associated with the endpoint.
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Check if the provided parameters are allowed.
     *
     * Throws a ClientError (status code 422) if an unauthorized parameter is detected.
     *
     * @throws ClientError If an unauthorized parameter is detected.
     */
    protected function checkAllowedParams()
    {
        foreach (REQUEST::params() as $key => $value) {
            if (!in_array($key, $this->allowedParams)) {
                throw new ClientError(422, "Unauthorized parameter: $key");
            }
        }
    }
}
