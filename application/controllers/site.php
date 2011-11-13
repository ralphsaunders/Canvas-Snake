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
}
?>
