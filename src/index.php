<?php

/**
 * Created by PRIME AI.
 * @author Samuel Hinchliffe <samuel@primeai.co.uk, sam.hinchliffe.work@gmail.com>
 * @see [Linkedin] {@link https://www.linkedin.com/in/samuel-hinchliffe-2bb5801a5/}
 *
 * Get the index page. 
 *
 * Created at: 18/01/2022
 * @see       [PRIME-AI GITHUB] {@link https://github.com/PRIME-AI-GITHUB}
 * @see       [Website]         {@link https://www.primeai.co.uk/}
 * @copyright 2018-2022 PRIME AI LTD
*/


header( 'Content-Security-Policy: frame-ancestors ' . $_GET['shop'] . " https://admin.shopify.com"  );

echo file_get_contents('./index.html');

?>