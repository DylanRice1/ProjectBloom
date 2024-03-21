<?php
 /** 
* Developer endpoint
* 
* This class returns developer name and student id

* @author Dhruv Thota
*/
class Developer extends Endpoint
{
    public function __construct()
    {
        switch(Request::method()) {
            case 'GET':
                $this->checkAllowedParams();
                $data['code'] = "W20024779";
                $data['name'] = "Dhruv Thota ";
                break;
            default:
                throw new ClientError(405);
        }
        parent::__construct($data);
    }
}