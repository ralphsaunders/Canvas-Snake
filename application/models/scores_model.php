<?php

class Scores_model extends CI_Model {

    function fetch_scores()
    {
        $query = $this->db->get( 'scores' );

        if( $query->num_rows() > 0 )
        {
            foreach( $query->result() as $row )
            {
                $scores[] = $row;
            }
        }
        else
        {
            return false;
        }

        return $scores;
    }
}

?>
