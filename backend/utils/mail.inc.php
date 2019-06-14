<?php
/**
 * Builds and sends an email through Mailgun
 *
 * @param array $data
 * @param array $mailgundata
 * @param string $type
 * @return array
 */
function send_email($data, $mailgundata,$type) {
    $html = '';
    $html .= "<html>";
    $html .= "<body>";
    switch ($type) {
        case 'contact':
            $subject = $data['subject'];
            $message = $data['message'];
            $name = $data['name'];
            $address = $data['email'];
            
            $html .= "Name: ";
            $html .= $name;
            $html .= "<br><br>";
    
            $html .= "Subject: ";
            $html .= "<b>". $subject ."</b>";
            $html .= "<br><br>";
    
            $html .= "Message:";
            $html .= "<br><br>";
            $html .= $message;
            $html .= "<br><br>";
    
            $html .= "<p>Sent by ".$address."</p>";
            $html .= "</body>";
            $html .= "</html>";
            try{
                $result = send_mailgun($mailgundata['email'], $mailgundata['email'], $subject, $html, $mailgundata);    
            } catch (Exception $e) {
                $return = 0;
            }
            break;
            
        case 'recover':
            $subject = 'Password Recovery';
            $message = 'We are sending you this message because you requested a password recovery, if this is not you then please contact the site administrator.';
            $message2 = 'Click on the following link to reset your password';
            $link = "http://localhost/angularjs/#/recover/".$data['email']."/".$data['token'];
            $address = $data['email'];
            
            $html .= "Subject: ";
            $html .= "<b>". $subject ."</b>";
            $html .= "<br><br>";
    
            $html .= "Message:";
            $html .= "<br><br>";
            $html .= $message;
            $html .= "<br>";
            $html .= $message2;
            $html .= "<br>";
            $html .= $link;
            $html .= "<br><br>";
            $html .= "This email would have been sent to: ".$address;
            $html .= "<br><br>";

            $html .= "</body>";
            $html .= "</html>";
            try{
                $result = send_mailgun($mailgundata['email'], $mailgundata['email'], $subject, $html, $mailgundata);    
            } catch (Exception $e) {
                $return = 0;
            }
            break;

        case 'activation':
            $subject = 'Account activation';
            $message = 'Thank you for registering.';
            $message2 = 'Click on the following link to activate your account';
            $link = "http://localhost/angularjs/#/activation/".$data['username']."/".$data['token'];
            $address = $data['email'];
            
            $html .= "Subject: ";
            $html .= "<b>". $subject ."</b>";
            $html .= "<br><br>";
    
            $html .= "Message:";
            $html .= "<br><br>";
            $html .= $message;
            $html .= "<br>";
            $html .= $message2;
            $html .= "<br>";
            $html .= $link;
            $html .= "<br><br>";
            $html .= "This email would have been sent to: ".$address;
            $html .= "<br><br>";

            $html .= "</body>";
            $html .= "</html>";
            try{
                $result = send_mailgun($mailgundata['email'], $mailgundata['email'], $subject, $html, $mailgundata);    
            } catch (Exception $e) {
                $return = 0;
            }
            break;
        default:
            # code...
            break;
    }    
    return $result;
}

/**
 * Sends the email via curl
 *
 * @param string $from
 * @param string $to
 * @param string $subject
 * @param string $html
 * @param array $mailgundata
 * @return array
 */
function send_mailgun($from, $to, $subject, $html, $mailgundata){
    $config = array();
    $config['api_key'] = $mailgundata['key']; //API Key
    $config['api_url'] = "https://api.mailgun.net/v3/".$mailgundata['domain']."/messages"; //API Base URL

    $message = array();
    $message['from'] = $from;
    $message['to'] =  $to;
    $message['h:Reply-To'] = $mailgundata['email'];
    $message['subject'] = $subject;
    $message['html'] = $html;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $config['api_url']);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}
