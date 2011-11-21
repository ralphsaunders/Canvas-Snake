<?php

class Scores_model extends CI_Model {

    /**
     * Fetches score information from database table 'scores'.
     *
     * @access private
     */
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

    /**
     * Adds score to 'scores' table in database when passed array.
     *
     * @param  array[ string, int ]
     * @access private
     */
    function add_score( $data )
    {
        $this->db->where( 'name',     $data[0] );
        $this->db->where( 'score >=', $data[1] );
        $query = $this->db->get( 'scores' );

        if( $query->num_rows() > 0 )
        {
            // There is a higher score in the table under that name
            return false;
        }
        else
        {
            $this->db->where( 'name',    $data[0] );
            $this->db->where( 'score <', $data[1] );
            $old_scores = $this->db->get( 'scores' );

            if( $old_scores->num_rows() > 0 )
            {
                foreach( $old_scores->result() as $row )
                {
                    $this->db->where( 'id', $row->id );
                    $this->db->delete( 'scores' );
                }
            }

            $new_score = array(
                'name'  => $data[0],
                'score' => $data[1]
            );

            $insert = $this->db->insert( 'scores', $new_score );

            if( $insert )
            {
                return $new_score;
            }
            else
            {
                return false;
            }
        }
    }
}

?>
