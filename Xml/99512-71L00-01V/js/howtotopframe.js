function changeopenerurl(url)
{
	if ( !window.opener || window.opener.closed)
	{
	}
	else
	{
		var objOpener = window.opener;
		objOpener.location.href = url;
		objOpener.focus();
	}
}