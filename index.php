<?php

/* -------------------------------------------------------------------------- */
/*                               Proxy UI Loader                              */
/* -------------------------------------------------------------------------- */

/**
 * Created by PRIME AI.
 * @author Samuel Hinchliffe <samuel@primeai.co.uk, sam.hinchliffe.work@gmail.com>
 * @see    [Linkedin] {@link https://www.linkedin.com/in/samuel-hinchliffe-2bb5801a5/}
 *
 * @summary This is the proxy UI Loader. This file will load in the React App of the Admin Page
 * The reason we have this file is because we want to load the React App with control over the
 * Content Security Policy. So random people cannot just start opening up the admin page.
 * It makes Shopify Happy.
 *
 * Created at: 19/05/2022
 * @see       [PRIME-AI GITHUB] {@link https://github.com/PRIME-AI-GITHUB}
 * @see       [Website]         {@link https://www.primeai.co.uk/}
 * @copyright 2018-2022 PRIME AI LTD
 */

// header('Content-Security-Policy: frame-ancestors ' . $_GET['store_name'] . " https://admin.shopify.com");
echo file_get_contents('./build/index.html');
