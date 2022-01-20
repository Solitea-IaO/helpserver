// Microsoft Dynamics 365 Business Central Documentation Feedback Script

var sProduct = 'Microsoft Dynamics 365 Business Central';
var sVersion = '2018';
// var sClassicFolderName = '\\Classic\\' //Set to parent folder containing the CSide docs
var privacyStatementURL = 'https://go.microsoft.com/fwlink/?linkid=837448';

// *****Start: Partner Section************************
var sPartner = "MSFT";//change to your company name
var sRecipient = "mailto:nav-olh@microsoft.com";//append your company's email address. Please leave the Microsoft address as well.
// ******End: Partner Section***********************

// *****Start: Localization Section************************
//---Note to localization: Do not change <A> and </A> tags.---

var L_fbLocale_Text = getLocaleText(); //This is the locale of the content; use the short string values at http://msdn2.microsoft.com/en-us/library/0h88fahh.aspx
var L_fbLink_Text = 'Documentation Feedback';//--- This is the link text appearing at the bottom of each topic ---

//--- This is the text appearing in the feedback window ---
var L_fbTitle_Text = 'Documentation Feedback';
var L_fbParagraph_Text = "Was this information helpful?";
var L_fbValue1_Text = "Yes, this information was helpful.";
var L_fbValue2_Text = "This Help topic contains a technical error.";
var L_fbValue3_Text = "I could not find what I was looking for.";
var L_fbValue4_Text = "The language or terminology was incorrect.";
var L_fbEnterFeedbackHere_Text = 'To submit your feedback,'; //The text: Click here will be appended here!
var L_fbViewPrivacyStatement_Text = 'To see how your personal information will be used, see <a href="' + privacyStatementURL + '" target="_blank">Microsoft Dynamics 365 Business Central ' + sVersion + ' Privacy Statement</a>.';
var L_fbCancel_Text = 'Cancel';


//--- This is the text appearing in the feedback email body ---
var L_fbTypeHere_Text = 'Microsoft Dynamics 365 Business Central ' + sVersion + ' Privacy Statement ' + encodeURIComponent(privacyStatementURL);

var L_fbSubmit_Text = 'click here';//This text is appended to "To add comments and send an email message with your feedback" above

//--- This text is appended to the text in the feedback email body, which depends on users selection ---
	var L_fbQuestion1_Text = "";
	var L_fbQuestion2_Text = "";
	var L_fbQuestion3_Text = "";
	var L_fbQuestionDefault_Text = "";

// ******End: Localization Section***********************


function FeedBackLink()
{
document.write('<b><a href="javascript:ShowFeedback()">' +L_fbLink_Text + '</a></b><br />');
}


function EMailStream(obj)
{
var stream;

stream = '<DIV ID="feedbackarea">'
	+ '<b>' + L_fbTitle_Text + '</b><br /><br />'
	+ '<P>' + L_fbParagraph_Text + '</P>'
	+ '<FORM METHOD="post" ENCTYPE="text/plain" NAME="formRating">'
	+ '<P><\P>'
	+ '<INPUT TYPE="radio" value="1" NAME="fbRating">' + L_fbValue1_Text + '<BR>'
	+ '<INPUT TYPE="radio" value="2" NAME="fbRating">' + L_fbValue2_Text + '<BR>'
	+ '<INPUT TYPE="radio" value="3" NAME="fbRating">' + L_fbValue3_Text + '<BR>'
	+ '<INPUT TYPE="radio" value="4" NAME="fbRating">' + L_fbValue4_Text + '<BR>'
	+ '</FORM>'
	+ '<P>' + L_fbViewPrivacyStatement_Text + '</P>'
	+ '<P>' + L_fbEnterFeedbackHere_Text + '&nbsp;'
	+ '<SPAN ONCLICK="feedbackarea.style.display=\'none\';document.getElementById(\'fbb\').style.display=\'block\';' + obj.id + '.innerHTML=\'\'">'+ submitFeedback() + '</SPAN></P>'
	+ '<P STYLE="width:100%;position:relative;float:left;clear:left;margin-bottom:-0.7em;margin-top:0em;" align=left><A HREF="#Feedback" ONCLICK=fbReload()>' + L_fbCancel_Text
	+ '</A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</P>'
	+ '<br><br>'
	+ '<hr>'
	+ '</div>';

obj.innerHTML = stream;

// Scroll to the bottom, after a delay
window.setTimeout('scrollToBottom()',50);

}

function ShowFeedback()
{EMailStream(fb);document.getElementById('fbb').style.display='none';};

function submitFeedback()
{

  var sTitle = ParseTitle(document.title);
  var sHTM = ParseFileName(window.location.href);

  var sSubject =  '[' + sProduct + '] ' + '[' + sVersion + '] ' + '[' + L_fbLocale_Text + '] ' + '[' + sPartner + '] ' + 
  	  '[' + sHTM + '] ' + '[' + sTitle + '] ' + '[' + '\' + GetRating() + \'' + '-Class]';

  var sEntireMailMessage = sRecipient + '?subject=' + sSubject
	+ '&body=' + L_fbTypeHere_Text + '\' + GetQuestion() + \'';
  
  var sHREF = '<A HREF=\"' + sRecipient + '" ONCLICK=\"this.href=\''
	+ sEntireMailMessage + '\';\">'+L_fbSubmit_Text+'</A>' + '.';
  
  return sHREF;
}

//---Parses document title.---
function ParseTitle(theTitle)
{
	theTitle = theTitle.replace(/\"/g,"--");
  	theTitle = theTitle.replace(/'/g,"-");
	if (theTitle == "") {theTitle = "Documentation Feedback";}
	if (theTitle.length > 60) {theTitle = theTitle.slice(0,57) + "...";}
	return theTitle;
}

//---Parses document filename.---
function ParseFileName(Filename)
{
  	var intPos = Filename.lastIndexOf("\\");
  	var intLen = Filename.length;
  	var newFileName = Filename.substr(intPos + 1, intLen  - intPos);
  	
  	// Look for the last forward slash, and any pound symbol
  	var x = newFileName.lastIndexOf("/") + 1;
  	var y = newFileName.lastIndexOf("#");
  	
  	if(y == (-1))
  	{
  		// There is no pound symbol (#)
  		newFileName = newFileName.slice(x);
  	}
  	else
  	{
  		newFileName = newFileName.slice(x,y);
  	}
  	
  	return(newFileName);
}

function GetRating()
{
    sRating = "0";
	for(var x = 0;x < 3;x++)
  	{
      		if(document.formRating.fbRating[x].checked) { sRating = x + 1;}
  	}
	return sRating;
}

function GetQuestion()
{
	var rating = GetRating();
	var question;

	if(rating == "1")
	{
		question = L_fbQuestion1_Text;
	}
	else if(rating == "2")
	{
		question = L_fbQuestion2_Text;
	}
	else if(rating == "3")
	{
		question = L_fbQuestion3_Text;
	}
	else
	{
		question = L_fbQuestionDefault_Text;
	}

	return question;
}

//---Reloads window.---
function fbReload()
{
	window.location.reload(true);
}

//---Scrolls to the bottom of the window.---
function scrollToBottom()
{
	window.scrollBy(0,20000);
}

function getLocaleText() {
    var urlParts = window.location.href.split('/');
    var localeTextIndex = urlParts.indexOf('help') + 1;
    var localeText = urlParts[localeTextIndex];

    if (localeText) {
        return localeText === "en" ? "W1" : localeText;
    } else {
        return "W1";
    }
}
// SIG // Begin signature block
// SIG // MIIn5AYJKoZIhvcNAQcCoIIn1TCCJ9ECAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // K/wk9dIz4gdhutwLxL6AFmNBTUKiqzhrPmAGU/h91g+g
// SIG // gg2BMIIF/zCCA+egAwIBAgITMwAAAlKLM6r4lfM52wAA
// SIG // AAACUjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIxMDkwMjE4MzI1OVoX
// SIG // DTIyMDkwMTE4MzI1OVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 0OTPj7P1+wTbr+Qf9COrqA8I9DSTqNSq1UKju4IEV3HJ
// SIG // Jck61i+MTEoYyKLtiLG2Jxeu8F81QKuTpuKHvi380gzs
// SIG // 43G+prNNIAaNDkGqsENQYo8iezbw3/NCNX1vTi++irdF
// SIG // qXNs6xoc3B3W+7qT678b0jTVL8St7IMO2E7d9eNdL6RK
// SIG // fMnwRJf4XfGcwL+OwwoCeY9c5tvebNUVWRzaejKIkBVT
// SIG // hApuAMCtpdvIvmBEdSTuCKZUx+OLr81/aEZyR2jL1s2R
// SIG // KaMz8uIzTtgw6m3DbOM4ewFjIRNT1hVQPghyPxJ+ZwEr
// SIG // wry5rkf7fKuG3PF0fECGSUEqftlOptpXTQIDAQABo4IB
// SIG // fjCCAXowHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFDWSWhFBi9hrsLe2TgLuHnxG
// SIG // F3nRMFAGA1UdEQRJMEekRTBDMSkwJwYDVQQLEyBNaWNy
// SIG // b3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEWMBQG
// SIG // A1UEBRMNMjMwMDEyKzQ2NzU5NzAfBgNVHSMEGDAWgBRI
// SIG // bmTlUAXTgqoXNzcitW2oynUClTBUBgNVHR8ETTBLMEmg
// SIG // R6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3JsMGEGCCsGAQUFBwEBBFUwUzBRBggrBgEFBQcw
// SIG // AoZFaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEL
// SIG // BQADggIBABZJN7ksZExAYdTbQJewYryBLAFnYF9amfhH
// SIG // WTGG0CmrGOiIUi10TMRdQdzinUfSv5HHKZLzXBpfA+2M
// SIG // mEuJoQlDAUflS64N3/D1I9/APVeWomNvyaJO1mRTgJoz
// SIG // 0TTRp8noO5dJU4k4RahPtmjrOvoXnoKgHXpRoDSSkRy1
// SIG // kboRiriyMOZZIMfSsvkL2a5/w3YvLkyIFiqfjBhvMWOj
// SIG // wb744LfY0EoZZz62d1GPAb8Muq8p4VwWldFdE0y9IBMe
// SIG // 3ofytaPDImq7urP+xcqji3lEuL0x4fU4AS+Q7cQmLq12
// SIG // 0gVbS9RY+OPjnf+nJgvZpr67Yshu9PWN0Xd2HSY9n9xi
// SIG // au2OynVqtEGIWrSoQXoOH8Y4YNMrrdoOmjNZsYzT6xOP
// SIG // M+h1gjRrvYDCuWbnZXUcOGuOWdOgKJLaH9AqjskxK76t
// SIG // GI6BOF6WtPvO0/z1VFzan+2PqklO/vS7S0LjGEeMN3Ej
// SIG // 47jbrLy3/YAZ3IeUajO5Gg7WFg4C8geNhH7MXjKsClsA
// SIG // Pk1YtB61kan0sdqJWxOeoSXBJDIzkis97EbrqRQl91K6
// SIG // MmH+di/tolU63WvF1nrDxutjJ590/ALi383iRbgG3zkh
// SIG // EceyBWTvdlD6FxNbhIy+bJJdck2QdzLm4DgOBfCqETYb
// SIG // 4hQBEk/pxvHPLiLG2Xm9PEnmEDKo1RJpMIIHejCCBWKg
// SIG // AwIBAgIKYQ6Q0gAAAAAAAzANBgkqhkiG9w0BAQsFADCB
// SIG // iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEw
// SIG // OTA5WjB+MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQD
// SIG // Ex9NaWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDEx
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // q/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4Bjga
// SIG // BEm6f8MMHt03a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSH
// SIG // fpRgJGyvnkmc6Whe0t+bU7IKLMOv2akrrnoJr9eWWcpg
// SIG // GgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpc
// SIG // oRb0RrrgOGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnn
// SIG // Db6gE3e+lD3v++MrWhAfTVYoonpy4BI6t0le2O3tQ5GD
// SIG // 2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLT
// SIG // swM9sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOE
// SIG // y/S6A4aN91/w0FK/jJSHvMAhdCVfGCi2zCcoOCWYOUo2
// SIG // z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
// SIG // A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL
// SIG // 5zmhD+kjSbwYuER8ReTBw3J64HLnJN+/RpnF78IcV9uD
// SIG // jexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmnEyim
// SIG // p31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8Hh
// SIG // hUSJxAlMxdSlQy90lfdu+HggWCwTXWCVmj5PM4TasIgX
// SIG // 3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0wggHpMBAG
// SIG // CSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXT
// SIG // gqoXNzcitW2oynUClTAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx
// SIG // 0SOJNDBaBgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4G
// SIG // CCsGAQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
// SIG // HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEF
// SIG // BQcCARYzaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
// SIG // aW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsGAQUF
// SIG // BwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5
// SIG // AF8AcwB0AGEAdABlAG0AZQBuAHQALiAdMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKbC5YR4WOS
// SIG // mUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np
// SIG // 22O/IjWll11lhJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r
// SIG // 4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6I/MTfaaQdION
// SIG // 9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWlu
// SIG // WpiW5IP0wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiX
// SIG // mE0OPQvyCInWH8MyGOLwxS3OW560STkKxgrCxq2u5bLZ
// SIG // 2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNA
// SIG // BQamASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPD
// SIG // XVJihsMdYzaXht/a8/jyFqGaJ+HNpZfQ7l1jQeNbB5yH
// SIG // PgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
// SIG // XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbS
// SIG // oqKfenoi+kiVH6v7RyOA9Z74v2u3S5fi63V4GuzqN5l5
// SIG // GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33VtY5E9
// SIG // 0Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZO
// SIG // SEXAQsmbdlsKgEhr/Xmfwb1tbWrJUnMTDXpQzTGCGbsw
// SIG // ghm3AgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTECEzMAAAJSizOq+JXzOdsAAAAAAlIwDQYJYIZI
// SIG // AWUDBAIBBQCggdowGQYJKoZIhvcNAQkDMQwGCisGAQQB
// SIG // gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
// SIG // ARUwLwYJKoZIhvcNAQkEMSIEIBsTyNj7iaNzOK/kHc8H
// SIG // JPuKORXfqLFdW1AVjtOjLo4wMG4GCisGAQQBgjcCAQwx
// SIG // YDBeoECAPgBNAGkAYwByAG8AcwBvAGYAdAAuAEQAeQBu
// SIG // AGEAbQBpAGMAcwAuAE4AYQB2AC4ATABhAG4AZwB1AGEA
// SIG // ZwBloRqAGGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbTAN
// SIG // BgkqhkiG9w0BAQEFAASCAQCks+a6zn1bKjCnUa/JovIl
// SIG // nUr4MmHCJ/5JR9EAKNJOBt38MzYbe953YIuRCOpC/jE4
// SIG // PmFdSF+l78uTQX9GEPv32npvvkpgZfRwCiYUIwMqEjRl
// SIG // 8WC/v5ukT0NR4NyG+d3GL1v1dWjBHt9qjhu/2disIFlc
// SIG // nDJO4ddGwH5Jm3s17yXpspVKHAN/193mwjsOAlT86p7Q
// SIG // InUVtt2DvCNhDFhR/JFnoTm21an7TQSBmocXFIW3FKc1
// SIG // 8RboE1dVj6JNOJwaIVCuaf81fF5WJg9gvKD2mIyIobIz
// SIG // ioFUZ1UqZreW4JvIVOqdF2Chq8JzVCfXrweuRZi5d35U
// SIG // qHlOxBzQOw/JoYIXGTCCFxUGCisGAQQBgjcDAwExghcF
// SIG // MIIXAQYJKoZIhvcNAQcCoIIW8jCCFu4CAQMxDzANBglg
// SIG // hkgBZQMEAgEFADCCAVkGCyqGSIb3DQEJEAEEoIIBSASC
// SIG // AUQwggFAAgEBBgorBgEEAYRZCgMBMDEwDQYJYIZIAWUD
// SIG // BAIBBQAEIEuCK890fo1npNL8EsgPbi0Jn0UJYdAZy8kz
// SIG // XaUGD21WAgZhlV11Tw8YEzIwMjExMTI1MTYwNjE2Ljg3
// SIG // OFowBIACAfSggdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046MkFENC00QjkyLUZBMDExJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WgghFo
// SIG // MIIHFDCCBPygAwIBAgITMwAAAYZ45RmJ+CRLzAABAAAB
// SIG // hjANBgkqhkiG9w0BAQsFADB8MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBQQ0EgMjAxMDAeFw0yMTEwMjgxOTI3MzlaFw0yMzAx
// SIG // MjYxOTI3MzlaMIHSMQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0w
// SIG // KwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRp
// SIG // b25zIExpbWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1Mg
// SIG // RVNOOjJBRDQtNEI5Mi1GQTAxMSUwIwYDVQQDExxNaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkq
// SIG // hkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwI3G2Wpv6B4I
// SIG // jAfrgfJpndPOPYO1Yd8+vlfoIxMW3gdCDT+zIbafg14p
// SIG // Ou0t0ekUQx60p7PadH4OjnqNIE1q6ldH9ntj1gIdl4Hq
// SIG // 4rdEHTZ6JFdE24DSbVoqqR+R4Iw4w3GPbfc2Q3kfyyFy
// SIG // j+DOhmCWw/FZiTVTlT4bdejyAW6r/Jn4fr3xLjbvhITa
// SIG // tr36VyyzgQ0Y4Wr73H3gUcLjYu0qiHutDDb6+p+yDBGm
// SIG // KFznOW8wVt7D+u2VEJoE6JlK0EpVLZusdSzhecuUwJXx
// SIG // b2uygAZXlsa/fHlwW9YnlBqMHJ+im9HuK5X4x8/5B5dk
// SIG // uIoX5lWGjFMbD2A6Lu/PmUB4hK0CF5G1YaUtBrME73DA
// SIG // Kkypk7SEm3BlJXwY/GrVoXWYUGEHyfrkLkws0RoEMpoI
// SIG // EgebZNKqjRynRJgR4fPCKrEhwEiTTAc4DXGci4HHOm64
// SIG // EQ1g/SDHMFqIKVSxoUbkGbdKNKHhmahuIrAy4we9s7rZ
// SIG // JskveZYZiDmtAtBt/gQojxbZ1vO9C11SthkrmkkTMLQf
// SIG // 9cDzlVEBeu6KmHX2Sze6ggne3I4cy/5IULnHZ3rM4ZpJ
// SIG // c0s2KpGLHaVrEQy4x/mAn4yaYfgeH3MEAWkVjy/qTDh6
// SIG // cDCF/gyz3TaQDtvFnAK70LqtbEvBPdBpeCG/hk9l0laY
// SIG // zwiyyGY/HqMCAwEAAaOCATYwggEyMB0GA1UdDgQWBBQZ
// SIG // tqNFA+9mdEu/h33UhHMN6whcLjAfBgNVHSMEGDAWgBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSg
// SIG // UqBQhk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIw
// SIG // UENBJTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBe
// SIG // MFwGCCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNV
// SIG // HRMBAf8EAjAAMBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0G
// SIG // CSqGSIb3DQEBCwUAA4ICAQDD7mehJY3fTHKC4hj+wBWB
// SIG // 8544uaJiMMIHnhK9ONTM7VraTYzx0U/TcLJ6gxw1tRzM
// SIG // 5uu8kswJNlHNp7RedsAiwviVQZV9AL8IbZRLJTwNehCw
// SIG // k+BVcY2gh3ZGZmx8uatPZrRueyhhTTD2PvFVLrfwh2li
// SIG // DG/dEPNIHTKj79DlEcPIWoOCUp7p0ORMwQ95kVaibpX8
// SIG // 9pvjhPl2Fm0CBO3pXXJg0bydpQ5dDDTv/qb0+WYF/vNV
// SIG // EU/MoMEQqlUWWuXECTqx6TayJuLJ6uU7K5QyTkQ/l24I
// SIG // hGjDzf5AEZOrINYzkWVyNfUOpIxnKsWTBN2ijpZ/Tun5
// SIG // qrmo9vNIDT0lobgnulae17NaEO9oiEJJH1tQ353dhuRi
// SIG // +A00PR781iYlzF5JU1DrEfEyNx8CWgERi90LKsYghZBC
// SIG // DjQ3DiJjfUZLqONeHrJfcmhz5/bfm8+aAaUPpZFeP0g0
// SIG // Iond6XNk4YiYbWPFoofc0LwcqSALtuIAyz6f3d+UaZZs
// SIG // p41U4hCIoGj6hoDIuU839bo/mZ/AgESwGxIXs0gZU6A+
// SIG // 2qIUe60QdA969wWSzucKOisng9HCSZLF1dqc3QUawr0C
// SIG // 0U41784Ko9vckAG3akwYuVGcs6hM/SqEhoe9jHwe4Xp8
// SIG // 1CrTB1l9+EIdukCbP0kyzx0WZzteeiDN5rdiiQR9mBJu
// SIG // ljCCB3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAA
// SIG // ABUwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENl
// SIG // cnRpZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkz
// SIG // MDE4MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9
// SIG // DtWC0/3unAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9c
// SIG // T8dm95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1q
// SIG // UoNEt6aORmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP
// SIG // 2CZTfDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBb
// SIG // fowQHJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOOR
// SIG // j7I5LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c
// SIG // +gVVmG1oO5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s
// SIG // 4mKyzbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9
// SIG // QZpGdc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+
// SIG // Nuw2TPYrbqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjt
// SIG // p+iZfD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi
// SIG // 0b1qGFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJ
// SIG // NmSLW6CmgyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR
// SIG // /bLUHMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PA
// SIG // PBXbGjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIu
// SIG // rQIDAQABo4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEA
// SIG // ATAjBgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnP
// SIG // EP8vBO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1
// SIG // GelyMFwGA1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEw
// SIG // PwYIKwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIE
// SIG // DB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0T
// SIG // AQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo
// SIG // 0T2UkFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRw
// SIG // Oi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9k
// SIG // dWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmww
// SIG // WgYIKwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv
// SIG // 6lwUtj5OR2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsP
// SIG // MeTCj/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgAD
// SIG // sAW+iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU
// SIG // 5HhTdSRXud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/
// SIG // GbYSEhFdPSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefw
// SIG // C2qBwoEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvf
// SIG // SaN0DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT9
// SIG // 9kxybxCrdTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3B
// SIG // FARxv2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFr
// SIG // DZ+kKNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S
// SIG // 0Ex2tVdUCbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6T
// SIG // vsv4O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAo
// SIG // GokLjzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9
// SIG // JZTmdHRbatGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoI
// SIG // Yn/ZcGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLX
// SIG // MIICQAIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5k
// SIG // IE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhh
// SIG // bGVzIFRTUyBFU046MkFENC00QjkyLUZBMDExJTAjBgNV
// SIG // BAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2Wi
// SIG // IwoBATAHBgUrDgMCGgMVAAGu2DRzWkKljmXySX1korHL
// SIG // 4fMnoIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEm
// SIG // MCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // IDIwMTAwDQYJKoZIhvcNAQEFBQACBQDlSb8WMCIYDzIw
// SIG // MjExMTI1MTU1MTUwWhgPMjAyMTExMjYxNTUxNTBaMHcw
// SIG // PQYKKwYBBAGEWQoEATEvMC0wCgIFAOVJvxYCAQAwCgIB
// SIG // AAICJUUCAf8wBwIBAAICEUIwCgIFAOVLEJYCAQAwNgYK
// SIG // KwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgC
// SIG // AQACAwehIKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUF
// SIG // AAOBgQA3JdCz1TxQ0dNKTfihmwkMKNc1g8WGq/2Ou7yL
// SIG // 09c9QHklaS5MsNRrlRy5y8mFN/lAT0Hr8QECpXaKk1Hm
// SIG // yGfaC0rtWs62jZxcoQNHY407NLsTfKYSgWqOl2GitSFr
// SIG // B/gxbS5scNcs+C/Brk8VlwZ2MZVT0gJpLT8j0Hh2M3mY
// SIG // azGCBA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
// SIG // IFBDQSAyMDEwAhMzAAABhnjlGYn4JEvMAAEAAAGGMA0G
// SIG // CWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYL
// SIG // KoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIHu8Rts4
// SIG // F45y34SFYBcL6cQlevKIxvMjh/09O5dY6IUHMIH6Bgsq
// SIG // hkiG9w0BCRACLzGB6jCB5zCB5DCBvQQgGpmI4LIsCFTG
// SIG // iYyfRAR7m7Fa2guxVNIw17mcAiq8Qn4wgZgwgYCkfjB8
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAYZ4
// SIG // 5RmJ+CRLzAABAAABhjAiBCApF2edw+CPupapPbaWY8Xy
// SIG // m3lOV3m2VCcsPvm0RH9iazANBgkqhkiG9w0BAQsFAASC
// SIG // AgCdvDx7pT3YA8sYfdjOSHiaD7y69bty6lS9FP2XJq/z
// SIG // n0Yu6PUxQwkb9OprO+FmCSTfTTDpHIYE+sV4ohmvP4ar
// SIG // HIklTKwix8t8X2moqWZqO47+KeYF9kzCgASSJ+vl8q2R
// SIG // DdFp3yTpaG9KNBV+g4KrVJ6dArg9ixR3ME0czeO+nCWW
// SIG // 2HfDUaGZe+7HHM8riEusZmqGWQwlWkhRUuV9nhVB/bv1
// SIG // qbZ/baMMpYxDCn4DNfsFXnVsaqveQ4SiPPRJ6sbVboh1
// SIG // aglq9kQ5BZc0INF6sGtTOmb56+NB4PmRgMuVuhSX3PRX
// SIG // Hfgs/7QWvOiEf7H46cLT+cn11iCo1gTbJmBAgYRNuCKz
// SIG // Ol6nergz+7KAEewRxo5ZzRq+Wr0g5TFkw3u7i2epUgeB
// SIG // f/q6nVO8gqe2CNajEb7KsTQpcqxMMSt0hkN03HqYjBTl
// SIG // n6/8RqbZNSkpmbmne0/uRl2DrIjj+fZHrBYIvTYwqJ4T
// SIG // mRXP+PSOObOoXykVoFdkHKnCuH+TED5LjiyRjjW8ezcE
// SIG // x3uRozBYtLwsfDlfsPqZofyvb8vBllkDXsrinQ+YFC+p
// SIG // mLY7c8SC+KfxHFEfWh7NHQ+6HG4BVaT+PNPMp+qgmHKa
// SIG // 5Sx8yUiN+2Bh3yhfie5wv0I0+w81wIHhsR6a2Q9D4nw8
// SIG // Qm5deS5iJRlpf/5pBu7/V38JMQ==
// SIG // End signature block
