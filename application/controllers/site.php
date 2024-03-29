<?php if( ! defined( 'BASEPATH' ) ) exit ( 'No direct script access allowed' );

class Site extends CI_Controller {

    /**
     * Index page for this controller.
     *
     * Maps to:
     *      http://example.com/index.php/site
     */
    public function index()
    {
        $this->load->model( 'scores_model' );

        if( $query = $this->scores_model->fetch_scores() )
        {
            $data['scores'] = $query;
        }

        $data['main_content'] = 'snake';
        $this->load->view( 'includes/template', $data );
    }

    /**
     * Add Score method for this controller.
     *
     * Maps to:
     *      http://example.com/index.php/site/add_score
     *
     * Called with javascript, $_POST['data'] is an array:
     *      [ string, int ]
     *
     * @access public
     */
    public function add_score()
    {
        if( isset( $_POST['data'] ) )
        {
            $this->load->helper( 'security' );
            $data = $this->security->xss_clean( $_POST['data'] );

            $this->load->model( 'scores_model' );

            if( $score_data = $this->scores_model->add_score( $data ) )
            {
                echo json_encode( $score_data );
            }
            else
            {
                return false;
            }
        }
    }
}
?>
