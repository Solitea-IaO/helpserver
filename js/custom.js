function iframeLoaded() {
    injectCssInIFrame();
    resizeHelpContentIFrame();
    patchContentLinks();
}

function patchContentLinks() {
    var frameContents = $("#mainContentIFrame").contents();
    var elements = $("a", frameContents);


    var regex = new RegExp("(\./)?[a-zA-Z0-9_]+\\.htm");
    var filteredElements = elements.filter(function () {
        var href = $(this).attr("href");
        return regex.test(href) && !(href.toLowerCase().indexOf("http") === 0);
    });

    var lang = getLanguage();
    filteredElements.each(function () {
        if ($(this).attr("href").indexOf("/main.aspx?lang=") == 0) {
            return;
        }

        var fullPathName = $(this).context.pathname;
        var langIndex = fullPathName.indexOf(lang);

        var href;
        if (langIndex == -1) {
            href = $(this).attr("href").replace("./", "");
        }
        else {
            var pageStartIndex = langIndex + lang.length + 1;
            href = fullPathName.substr(pageStartIndex);
        }

        var newUrl = "/main.aspx?lang=" + lang + "&content=" + href;
        $(this).attr("href", newUrl);
        $(this).attr("target", "_parent");
    });

    var externalLinks = elements.filter(function () {
        var href = $(this).attr("href");
        return href.toLowerCase().indexOf("http") === 0;
    });

    externalLinks.each(function () {
        $(this).attr("target", "_externalContent");
    });
}

function getLanguage() {
    return getUrlVars()["lang"];
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var resizeTimer;
function resizeHelpContentIFrame() {
    if (resizeTimer) {
        clearInterval(resizeTimer);
    }
    resizeTimer = setInterval(iFrameResize, 200);
}

function iFrameResize() {
    var iFrame = $("#mainContentIFrame");
    iFrame.contents().find("body").css("margin-left", "0px");
    var newHeight = iFrame[0].contentWindow.document.body.scrollHeight;
    iFrame.height(newHeight);
}

function injectCssInIFrame() {
    var iFrameHead = $("#mainContentIFrame").contents().find("head");
    iFrameHead.append(
    $('<link/>', { href: '/css/injected.css', rel: 'stylesheet' }));
}

function init() {
    $(".TocLeftPane").resizable({ handles: "e" });
    $("#mainContentIFrame").ready(iframeLoaded);
}
// SIG // Begin signature block
// SIG // MIIjvAYJKoZIhvcNAQcCoIIjrTCCI6kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 5CS55tLq54309UP+YbhNv5bE4ih4Zx0KOvhg7Nw2QFWg
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
// SIG // SEXAQsmbdlsKgEhr/Xmfwb1tbWrJUnMTDXpQzTGCFZMw
// SIG // ghWPAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTECEzMAAAJSizOq+JXzOdsAAAAAAlIwDQYJYIZI
// SIG // AWUDBAIBBQCggdowGQYJKoZIhvcNAQkDMQwGCisGAQQB
// SIG // gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
// SIG // ARUwLwYJKoZIhvcNAQkEMSIEIIRGJXWNqKnTb6B/Oe2l
// SIG // vbB0ESqLaN4AtzDtMl/oujTRMG4GCisGAQQBgjcCAQwx
// SIG // YDBeoECAPgBNAGkAYwByAG8AcwBvAGYAdAAuAEQAeQBu
// SIG // AGEAbQBpAGMAcwAuAE4AYQB2AC4ATABhAG4AZwB1AGEA
// SIG // ZwBloRqAGGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbTAN
// SIG // BgkqhkiG9w0BAQEFAASCAQBQDLu0dDBE9EU+/KjS5EMY
// SIG // m23dhJFhYYWwxabCvvMeq0ikSh46EXDLXH+NMXmkD3p8
// SIG // HjCC5XNhozn85+0r4QlqTOWhSZyKkN/N+o5qxhuLkSQF
// SIG // dsihowav85hplgE4T/NGjvsh0PCOfrsT0NCXxFtePrxq
// SIG // 2k+dosmQWUIwjlDRqtZwkL+sEuIlYJZT4GTwxCKlo3aA
// SIG // NR090TQm5qKFD0wYdFYf+fXPRWoY5zohDAJDK+TedHK4
// SIG // dnzWOiEzZaAy4fZRZRtAgA0AWA4GiEZvhxjRYsQRvgVk
// SIG // NQ4uB3RESZLRh9Kga/qXEnIFAdr5jlbnLfdgXMkp8bCd
// SIG // RoH1H8gi82BfoYIS8TCCEu0GCisGAQQBgjcDAwExghLd
// SIG // MIIS2QYJKoZIhvcNAQcCoIISyjCCEsYCAQMxDzANBglg
// SIG // hkgBZQMEAgEFADCCAVUGCyqGSIb3DQEJEAEEoIIBRASC
// SIG // AUAwggE8AgEBBgorBgEEAYRZCgMBMDEwDQYJYIZIAWUD
// SIG // BAIBBQAEIN+pDaKhI/dJeouDwy7pTeX3pnGdttYSUEwW
// SIG // 1bch+u5lAgZhk+/ZtHMYEzIwMjExMTI1MTYwODEwLjg0
// SIG // NlowBIACAfSggdSkgdEwgc4xCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRpb25z
// SIG // IFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFsZXMgVFNT
// SIG // IEVTTjowQTU2LUUzMjktNEQ0RDElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCDkQwggT1
// SIG // MIID3aADAgECAhMzAAABW3ywujRnN8GnAAAAAAFbMA0G
// SIG // CSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwMB4XDTIxMDExNDE5MDIxNloXDTIyMDQxMTE5
// SIG // MDIxNlowgc4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKTAnBgNV
// SIG // BAsTIE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1ZXJ0byBS
// SIG // aWNvMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjowQTU2
// SIG // LUUzMjktNEQ0RDElMCMGA1UEAxMcTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgU2VydmljZTCCASIwDQYJKoZIhvcNAQEB
// SIG // BQADggEPADCCAQoCggEBAMgkf6Xs9dqhesumLltnl6lw
// SIG // jiD1jh+Ipz/6j5q5CQzSnbaVuo4KiCiSpr5WtqqVlD7n
// SIG // T/3WX6V6vcpNQV5cdtVVwafNpLn3yF+fRNoUWh1Q9u8X
// SIG // GiSX8YzVS8q68JPFiRO4HMzMpLCaSjcfQZId6CiukyLQ
// SIG // ruKnSFwdGhMxE7GCayaQ8ZDyEPHs/C2x4AAYMFsVOssS
// SIG // dR8jb8fzAek3SNlZtVKd0Kb8io+3XkQ54MvUXV9cVL1/
// SIG // eDdXVVBBqOhHzoJsy+c2y/s3W+gEX8Qb9O/bjBkR6hIa
// SIG // OwEAw7Nu40/TMVfwXJ7g5R/HNXCt7c4IajNN4W+Cugey
// SIG // sLnYbqRmW+kCAwEAAaOCARswggEXMB0GA1UdDgQWBBRl
// SIG // 5y01iG23UyBdTH/15TnJmLqrLjAfBgNVHSMEGDAWgBTV
// SIG // YzpcijGQ80N7fEYbxTNoWoVtVTBWBgNVHR8ETzBNMEug
// SIG // SaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtp
// SIG // L2NybC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0FfMjAxMC0w
// SIG // Ny0wMS5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsGAQUF
// SIG // BzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // L2NlcnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3LTAxLmNy
// SIG // dDAMBgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoGCCsGAQUF
// SIG // BwMIMA0GCSqGSIb3DQEBCwUAA4IBAQCnM2s7phMamc4Q
// SIG // dVolrO1ZXRiDMUVdgu9/yq8g7kIVl+fklUV2Vlout6+f
// SIG // pOqAGnewMtwenFtagVhVJ8Hau8Nwk+IAhB0B04DobNDw
// SIG // 7v4KETARf8KN8gTH6B7RjHhreMDWg7icV0Dsoj8MIA8A
// SIG // irWlwf4nr8pKH0n2rETseBJDWc3dbU0ITJEH1RzFhGkW
// SIG // 7IzNPQCO165Tp7NLnXp4maZzoVx8PyiONO6fyDZr0yqV
// SIG // uh9OqWH+fPZYQ/YYFyhxy+hHWOuqYpc83Phn1vA0Ae1+
// SIG // Wn4bne6ZGjPxRI6sxsMIkdBXD0HJLyN7YfSrbOVAYwjY
// SIG // WOHresGZuvoEaEgDRWUrMIIGcTCCBFmgAwIBAgIKYQmB
// SIG // KgAAAAAAAjANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJv
// SIG // b3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcN
// SIG // MTAwNzAxMjEzNjU1WhcNMjUwNzAxMjE0NjU1WjB8MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAKkdDbx3EYo6IOz8
// SIG // E5f1+n9plGt0VBDVpQoAgoX77XxoSyxfxcPlYcJ2tz5m
// SIG // K1vwFVMnBDEfQRsalR3OCROOfGEwWbEwRA/xYIiEVEMM
// SIG // 1024OAizQt2TrNZzMFcmgqNFDdDq9UeBzb8kYDJYYEby
// SIG // WEeGMoQedGFnkV+BVLHPk0ySwcSmXdFhE24oxhr5hoC7
// SIG // 32H8RsEnHSRnEnIaIYqvS2SJUGKxXf13Hz3wV3WsvYpC
// SIG // TUBR0Q+cBj5nf/VmwAOWRH7v0Ev9buWayrGo8noqCjHw
// SIG // 2k4GkbaICDXoeByw6ZnNPOcvRLqn9NxkvaQBwSAJk3jN
// SIG // /LzAyURdXhacAQVPIk0CAwEAAaOCAeYwggHiMBAGCSsG
// SIG // AQQBgjcVAQQDAgEAMB0GA1UdDgQWBBTVYzpcijGQ80N7
// SIG // fEYbxTNoWoVtVTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBi
// SIG // AEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB
// SIG // /zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvXzpoY
// SIG // xDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNS
// SIG // b29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1
// SIG // dF8yMDEwLTA2LTIzLmNydDCBoAYDVR0gAQH/BIGVMIGS
// SIG // MIGPBgkrBgEEAYI3LgMwgYEwPQYIKwYBBQUHAgEWMWh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9QS0kvZG9jcy9D
// SIG // UFMvZGVmYXVsdC5odG0wQAYIKwYBBQUHAgIwNB4yIB0A
// SIG // TABlAGcAYQBsAF8AUABvAGwAaQBjAHkAXwBTAHQAYQB0
// SIG // AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcNAQELBQADggIB
// SIG // AAfmiFEN4sbgmD+BcQM9naOhIW+z66bM9TG+zwXiqf76
// SIG // V20ZMLPCxWbJat/15/B4vceoniXj+bzta1RXCCtRgkQS
// SIG // +7lTjMz0YBKKdsxAQEGb3FwX/1z5Xhc1mCRWS3TvQhDI
// SIG // r79/xn/yN31aPxzymXlKkVIArzgPF/UveYFl2am1a+TH
// SIG // zvbKegBvSzBEJCI8z+0DpZaPWSm8tv0E4XCfMkon/VWv
// SIG // L/625Y4zu2JfmttXQOnxzplmkIz/amJ/3cVKC5Em4jns
// SIG // GUpxY517IW3DnKOiPPp/fZZqkHimbdLhnPkd/DjYlPTG
// SIG // pQqWhqS9nhquBEKDuLWAmyI4ILUl5WTs9/S/fmNZJQ96
// SIG // LjlXdqJxqgaKD4kWumGnEcua2A5HmoDF0M2n0O99g/Dh
// SIG // O3EJ3110mCIIYdqwUB5vvfHhAN/nMQekkzr3ZUd46Pio
// SIG // SKv33nJ+YWtvd6mBy6cJrDm77MbL2IK0cs0d9LiFAR6A
// SIG // +xuJKlQ5slvayA1VmXqHczsI5pgt6o3gMy4SKfXAL1Qn
// SIG // IffIrE7aKLixqduWsqdCosnPGUFN4Ib5KpqjEWYw07t0
// SIG // MkvfY3v1mYovG8chr1m1rtxEPJdQcdeh0sVV42neV8HR
// SIG // 3jDA/czmTfsNv11P6Z0eGTgvvM9YBS7vDaBQNdrvCScc
// SIG // 1bN+NR4Iuto229Nfj950iEkSoYIC0jCCAjsCAQEwgfyh
// SIG // gdSkgdEwgc4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKTAnBgNV
// SIG // BAsTIE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1ZXJ0byBS
// SIG // aWNvMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjowQTU2
// SIG // LUUzMjktNEQ0RDElMCMGA1UEAxMcTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsOAwIaAxUA
// SIG // CrtBbqYy0r+YGLtUaFVRW/Yh7qaggYMwgYCkfjB8MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0B
// SIG // AQUFAAIFAOVJotwwIhgPMjAyMTExMjUwOTUxMjRaGA8y
// SIG // MDIxMTEyNjA5NTEyNFowdzA9BgorBgEEAYRZCgQBMS8w
// SIG // LTAKAgUA5Umi3AIBADAKAgEAAgISYwIB/zAHAgEAAgIR
// SIG // bDAKAgUA5Ur0XAIBADA2BgorBgEEAYRZCgQCMSgwJjAM
// SIG // BgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIBAAID
// SIG // AYagMA0GCSqGSIb3DQEBBQUAA4GBAKmR7qS1Lz5ymIK0
// SIG // rIHeRJCRS7zMC7TuIjDhu9r9+GeB2/MpPulytTuJuf0x
// SIG // +u6l1phgo5PltwsSkgBRdKRgDcHCWJybIfpG+jcgC6mF
// SIG // 3N+TAo7E/JttqMfuBhgeKfE3twLuncvXzGTtr6ekF8lD
// SIG // 4zg18IIy/EMmXwdMhrv0uLpcMYIDDTCCAwkCAQEwgZMw
// SIG // fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAFb
// SIG // fLC6NGc3wacAAAAAAVswDQYJYIZIAWUDBAIBBQCgggFK
// SIG // MBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkq
// SIG // hkiG9w0BCQQxIgQgv7KKeW6CUwO+4TX7CT7CU8YFUQcp
// SIG // tMaQsR3MVGryTQ4wgfoGCyqGSIb3DQEJEAIvMYHqMIHn
// SIG // MIHkMIG9BCDJIuCpKGMRh4lCGucGPHCNJ7jq9MTbe3mQ
// SIG // 2FtSZLCFGTCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
// SIG // IFBDQSAyMDEwAhMzAAABW3ywujRnN8GnAAAAAAFbMCIE
// SIG // IHatDoc9GQM4k/17Fb57vTGz5fUPJz6EqK1NQv1Dpr5G
// SIG // MA0GCSqGSIb3DQEBCwUABIIBAHlr9mapkxvXssd0iLo3
// SIG // jJgt7XldVjLbMwy0EKtcqF28EMeWTy4BJ7a41IWRDKTb
// SIG // GpOjXC+ixxIAV2g7ZNvMQz+R/QDq90DX165zYul0z2EW
// SIG // hh8L1e5/9m2E2x0aoQQZtTYVa7ZzIqm1Du6APFq7WMqO
// SIG // 17Pf/pYARybWuIjSqlasHBXaS+ml8ug+vNPy6lUp5k1H
// SIG // H7J+WrOnQN5Xg8+ncUGYJrgZs194KeLVPcFi3pIYhvHz
// SIG // 6C1aBFYBjplzDgmGG91dBiUWNUFa5JcoXknPLQXsMydG
// SIG // RqMfi0ifHBXYscvkzmLU0EzeUmxXxK2OhQ5DffdjDhJL
// SIG // RR9wk/+VE0Wooas=
// SIG // End signature block
