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
        $data['main_content'] = 'snake';
        $data['scores'] = 'derp';
        $this->load->view( 'includes/template', $data );
    }
}
?>
