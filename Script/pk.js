const $ = new Env('京享值PK');
$.toObj = (t, e = null) => {
	try {
		return JSON.parse(t)
	} catch {
		return e
	}
}
$.toStr = (t, e = null) => {
	try {
		return JSON.stringify(t)
	} catch {
		return e
	}
}
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const sck = $.isNode() ? "set-cookie" : "Set-Cookie";
let cookiesArr = [],
	cookie = "",
	message;
let minPrize = 1;

var _0xodi='jsjiami.com.v6',_0x3216=[_0xodi,'w5zCkcOCwp3Ctw==','EjXDohfCixAQAcO0','wq1nw5bCjDo=','wpxMw40Awqg=','RsOhwpA=','NsKWwp8=','WwUnHcK7','InFJw6/Dnw==','ZsKlw7rCuQ==','woEvw6I=','wrbCm8O8wp4l','wqcaBQ==','wobCgMKx','wr1QJg==','w5DCksOEwpM=','SiDDrWt0','diHDm0Ro','Y0fCisOWwo4=','w73DpDPCtg==','HsKwcMOG','wpV8w6YCwrk/w4/CmQ==','O8K5wphpw5I=','wrVNNw==','Z8KVwrs+wrsBG2s=','wo89w5E4XA==','FinCkcOBQA==','XsK0wp4Dwpg=','5oKy6ICR5ZyRw7U=','ewXClMOYAsKOXMKVw7cMw5nCgcKRwqnDhsKM','w6zDocOEJlFWw7vCqwfDr8KCwrF6Z8OOH1TDjCbDrMOSwrPDi8OEFsKGw5TCjA==','aMOuTsOBew==','eMO2wpZmWw==','wrhXNTVpAcKADMKzUsOLCAjCiF3CtTMZKcKAJcKUfERsTnEMw7zCtcK/YcKQSMOTNcKowoFqw4nCpkJAw4bCjEV9E8O0wqoAccKtw6jDsm7CthPCucK4w5YAd1LCjGfDlyMtND/CqSvDrcK9wr1gwp5wwrnDtcKWSMOUGUrDmMKlasK0wrE2wpTCvw==','w4bClXJRwoE=','wqEMB8KxKcKYw7vDgMKpaQ==','LHd1Kx8=','YRzDsXIBZsKlwo/CnMOewqnCs8OQwrB8wpvCow==','d8OYwqE=','bsOnYcOmXA==','WwU7C8Kj','HcKwYMONwq1GOQ==','wopPDgs=','ZcO1bsOAS0s=','HMKywr5sw4/Ck8OhFMKP','w6DDtMOENw==','aVQaw7fCu8OtV8O4bg==','w7rDri0=','LBjDuAbCpA==','wocow4EbYQ==','WwUACMKlw7LDlT3Drg==','wrDCvMKgSMKz','wpfCvsO0','wp7CgMKFdcKm','6I+i5b2o5aeg5YuVaw==','w4rDk8OaE1Q=','bcOnZcOYWA==','5oyV5oqa5oif5Yit','wpnCusOQwqs5','w7Yow5tfFsO6w4jDgBHCi3jDoAMx','CcKtwrphw4rCp8OpDsKVw4pNw7HDjhwAOQ==','YF3DtmjCjFVvw4gVCjPDqcK9wr8AdGXDsxjCqWDDiMKkAsO/w5ltw7A=','wrXDqWANVExKJF3Crw==','wrkhUsOh','wp/DvsOSwqfCqMO0AMKzLcOxw7NJZ8OqwpnCkFw=','w6HCuV/CvyfDhxHCksO+TMOJwowBKMKIw49PcsKWTgNXwpHDsk3DhMK9JQ5pw7rCrFDDtRRwKMKRwp00QgDDv8OJSsK7LT7DksK3WlHDr1fCmSYbREs6wo8IP0/DlDt3wqEJIsKWBsOcw6zDungEwpLCnAXCj8Kcw7cFR1kZUsKHw7NrXsOwD1ZmYXPDtQ==','JcKWw5g=','YMOuTMObWg==','wr5PFRxj','KQ3DszPCpQ==','w6bCsXlywoM=','w4TCm8KEwpXCow==','eG3DgU/Ciw==','eFADw7DClA==','w5XDscO0AXE=','woVmNwPCuQ==','cF4tw4LCow==','w4fDtCXCnUk=','wqp2w5PCuAk=','Y8KZwqIXwrM=','w7RjZA==','SkXCt8O6woQ=','OsKzUsOHwqo=','d0HCisOS','CjXDsQ==','EGtqJxY=','bk8Pw6LCsg==','JnVUw6jDhsOtwqHCjA==','GsKGU8Ohwr8=','woLCgcOCwow+','XcK6wrYfwo02Ilg=','w7XCiHl/woU=','wqUZB8KvRcKOw7bDm8K7fw==','wrNXw54=','LsKWwqvDjsK8','e8O1wphUNg==','LcKjZMOZwoU=','OnRLw4nDkg==','5o6V5oqN5oqg5YuJ','WMOmwpZZfQ==','GsOUwpHCrGLCnlrCsw==','bsKrw6k=','dsOPwrpQLxPDoMKFwqYz','QsOpwrhtDw==','w4YRw4jDjTE=','FsKvw5MqIA==','WcO0woB8Sg==','5oKi6IOX5Z2Hw7E=','w7F/CcK7VMKMw40bQsK9w7/DpSDDmMOVQypKJDTDgCVBwplvW8OiUx5JWTjCosKfw64vKVHDp8KzCMKcRS1Ew6IDwodAGcORw79fHsKAcDQCwrPCll5SGQgXKMOOLDbCssONw4bCocKpdTAKZAbCu8Knwq4kXMOuNzrCu1B9PikbMhtQGMOFwpRHX3dyVsOhw4bCqcOt','w50Nw6vDpQtuccOrw5kJwoh8','BsKxd8OewrsPZcOswojCpArCgMKBOcOKw4JKAldaFsOoEw==','RsK0woEKw5MiIkXCo1Q=','T8K7EsKQwog6wpxfBQDDoB4rw5c7YWXDj8Ojw5Asw6LCgcObw5HDsR3DvcKFwqJ9J1o=','VmzCtcONTsOaw6bDiWBEbcK9wqF3FMKCFAEWDQ0bw4rCiMKHw5xrw79JZS5mU1Q1wrAJAsKrw5pZw5vClQDDksOfOH8JKMObesOfw7Vlw5YaMcOOHsKDwr5pEcOSw6dAwos2wrcswpouaRsEw5QGB2I3YcKtw5TCvcKpw77CpV3CsRduQ8KzwoF/wrXDsG8UIsOfw7EpHknDgTodwoXCusKjOcKOw5EHwrd1w5ELaE7DuMKoGcOdw4hUYsKZwrxRD8KdPsKJJRbCsx3Cm3cJw6I/wpMGwpHDgnPCvMKTwo5+CsKvwoUwK1/DjsKucBnCrmLCjQ/CjsKsw4YuQSjDhUXDksOhw4jDl8Ogw61Iwp7Dj8OTwq8pM250w57Ci8O9NcKkRcK4w4TDuMOzTh/DvV/Co8KfwrlyXsOsMQzDgXjDnsK/YsK/w7BISMKLw4AXwofDhsKFw4rDtX9CwpZff8Odw44OLTDCqyJ3wphowqEsw6Urw63DmSlrAjJcw7RFPA5DOgFTaMK+w4Ubw68tbk1mCMO/w6jDmU4ewqXCs8KyIsOBczHDui3CuxLCsytzKcOCwo9AwofDljcHVcOkw43DpnPDt3XDi8ON','woZaDhrChMOJbQ3DsHPDosKFSRxSKsOfbMK7VTPDpgHComvDmMOuwpDDvWHDnz0+w7zDq3xZAwbCrFHDl8O3wqVbwqfCncOEw7Bcw7Vaw6Y4w7TDq8Oyw6fChlE1wrnClMKUw41CNMKeYlxSw6kIOyg9w4bDucKsB0/Cp8OnXBDDm30ewo3CnlzDnX5Tw4JJw5IuEEQ3EU7CrcOYcCMadMKbcQIgwrrDp3XCtyzDl8OlNzB+XMOPwrbCu04rwow5dBHDtcKtw6NyawUBFiJNITVJw45QwqZtwoHDthHDgsKzwr4Dw5QzwrNoamtmwqwrwqYZw4QIwrTCj8K5wpEHwpHDvnrDjiZPwr5IfcKbw53Cky4rbTorw6Y/w7nDusOSw4DDmChyTFU+LDsMC8KCw7PCsAMsw5E=','C8KMwoRLw4c=','RsKbKsKfwos=','wqozOQDDkg==','w65dEsKSRQ==','wozDusK6wqof','WQ4WO8Kd','wprDq0MOEw==','wroAChnDsg==','wogOw6kXZw==','dMOrYQ==','w4XCm0LCiCc=','wptlGwHCvQ==','JHZFFhg=','PMKRwo5fw4o=','KMKMwoLDucKL','wpPDh8KVwq8y','w75uCQ==','EcK7cMKp','w7vDkVfDlz4=','Z0/CscORwos=','wpnCmsK1YsKxCMKe','w67CnUJFwqY=','wprCpsOywp0ZEg==','w7LDoD7CpA==','FSfCqsO2QkI=','SsKqFsKd','wqtXw40nwpAqw7PCsMOv','QwUT','w68iw7DDpwY=','w4dUVsK1','w73Col/CrjjCqlfDk8On','w7dqEMKu','5Lqu5LuY6Lao5Yyv','w7diHsKgacOXwo9R','CVE6Gzw=','w63CiE0=','Qgdqwps0','bSg3EMKM','fjRWwr8G','IFFMCjQ=','Bk4UASk=','6I2M5b6U5aeq5YmRZA==','w53CsMOwwps0BcOFw5lJwrc5TyAmwoV8RD/DqFvDi8O2wolUw57Cj8O0eQghw7nCjcOHCDbCksO/w5PCrsOye8Obw6bDl0jDt8OIw6h/T3EVdcKHQw==','Amc0LDN0wrI3w7k/YsKW','MsKNwozDisK9wrgsYiXCmsKVw4HDssK/bcKaNA8Hw7bCpsOmLw==','asOVw7heFg==','w7vDtTnCg1Q=','dnkCw5HCpA==','wowbBQrDmA==','WmvDiVzCmg==','B8KTw7gUJg==','wprChsK4','FhXDhSXCkw==','w7h7DcKnTsOVwoNAW8K3w7/CrTPDhMOPSmkffjzCljsKw4dgVcOmEl4AGHLCpw==','w6PCqUrCvyTDhlfDrcO8R8KJwoRVacOPwp0AK8OIUVMXwojCpUDDjcOsdxMkw6DDrlfCpUV/O8ONwrwxA0bCpsKYEcOjeXrDusOnV1DCqFDDmmdkRE48w5sNOxnDm2d2w6AcK8KCVMKXwqPCoSxUwpHCuHTDtMOrw6hTHSQ/VMOXw7YXVcOeXFEEJSrCijUtw4TDkifCgRnDtcK6w7xTwrnDlcO1LiPDucKBbcOewp3CicOjbMOqVMKEwqHDignCjcK5wqXDq1sYOkN9woNpwqXCucOEw5VVw74yw43CscOMwrjDisOYQAfCpWnCgcK8w5fDqcOpw7XDsFfCi8OnXQwIw5DDi8OVwoQ5w5tifRIuw5HDk8KaKyjCswR+w4wGcAHChsK+FlDCslIDOMKowpbCiWhmST4oXsKFw5nCsEN4V8Ofw59CU8Ovw4zDsA7ClVjCvmYCwrRZw4U8wp3CrS1WLcKNw73CjDTDm3/Ch8OpUkw5w5QXw4rCpn7CucKwMkDDk3hfOMOCw6fDvsKYdy3Dq8OlRMKkShRUPcOIwqYzKMO6e8OKJMKcdwnCi8OzBMKpDS3DiwkYY8Krw4RDMw7Dpw4Kwq/DlcOow6TCmG8=','wpXDnWAOPg==','wr/DgsOtwpXDjw==','w4gnwrZaDQ==','BGw5','X8O9wrhPcg==','wp1bGQnCksKAMQ==','w7nCvMOnwqDCvA==','bMKXw5bCv8OD','B3M7LQstwrkhwrMv','w71qCcKqVA==','w5HCg8OMwpjCjMKWw5VRw7DDuQ==','fBrClsOxCsKOVQ==','wozDglw4Pw==','wqrDo1YJCw==','cG8Yw5zCkg==','wqjDp8K2wpE6','w7ZBScK5w5I=','bkvDrUjCmQ==','wqYGBQ==','5Lmz5Lik6Laf5Y6x','bwjDvGdV','CDPDtR3CqSYUCg==','Jkt0Egk=','wpHCtcO5woAET8KSwoVBwrUmUg==','eMOJwqFNC0DCocOkwqMscsO8BMOpDhZgw4vDuzTCgzDDrA==','acKhw6vCqMKKSDbCv8K1Aw==','UcO6w5pOdg==','wrhXNTVpAcKADMKpRMKKAQLChhrCv3weKMKAJcKVPgdoRHgKwqvCrsOzcsKcSsOlecOzwrtbwofCimBCw7zCjQpyVsOhwp8yfcKtwr3DnTvCqTDDq8OqwrwUElnDhWjCgCNwfiPDuGfDpcOkwrAxw493wr7CocK2E8OTQB3Cm8KlPMKFwpUrw4PCpAXDi8OPw6vCrsOJwo10w6kgwrnCgMKowphvc8KkwqtqRMODfQhJPVfDl8KIwr0BwodCw4rDhcO8w68kZH15eGXDgncMI2kLw5HCl8OSK2oNwroIITnDgW3Cv0bDr8OdLsKuT8KzwoJ3Q3nDsRkhwrLDvMOFwq/DosKswpQpRXxTChdhRcK8GCbDh8OHwoTColXDiwjDsMOqwoXDrcOac8KQDjYKwpcaNGzDvQLChsO9wr0Z','OwrCh8OwbQ==','AWltw4DDvA==','wr44FsKKTQ==','wrTDnVIJKA==','YkTDk1zCjw==','wqXCncKuUcKs','DcKhZA==','XsKiDA==','AjvDohc=','YRdjwp4t','DcKGw7AVGg==','agnDvw==','SMOZwqJFXg==','wqzCm8O+wo4v','w67DscOaOVtCwr7DoE7DrcKAwrk=','Rx4AGcK6wp/Ck3zDrcOMGsKiEjjDglx5wovCqMOdCsKtw64=','ZQtnwodtfyHCocKyGw==','BMKhYsOewrgOI8KTwpDCuQvCgcOfdsOKwppKXAhFRsKpSGLDjWfCqGHDtcKew7HDnsKfwpPCvTzClRI5woHCiXfDjn/CmBTDisKUe8OpwrvCsMKewq/DhMKDwotbwqgfecOAVGTDpsOsTE3CpDjDm8Orwp9/Ek5sMcKkw4dlcMOMTGw0w6Rrw7nCgTsKwoPClAx0wo7Du8KLBATDlXrCnVF+w4k0wo9OVVxIw6g5wpvCtwHChsKwEsO1AhhmwofCmUU2wqbDuMO1ZsKvwqrCmEFabnl7aHbCrwbDlzDDrMOxNhUmwrLCg37CucO5w4USAMKYVCl6I8OsAUHCiRNxEMOTXcOow5nCm8Kiw7JnXgrCkEsNw5/CiMK1w4McbMOsT8Kew5vDi8OKw7AZw5ZLw7rCgFZ5wrk2w7RzPjrCrsOvwpXCuE7CjsKracKJYwvCsWHDvcK8D8OIDsODUsKHwpBXIsKXw6oiwojDosOUGylJw6bCvzc6IcOywrPCh2AIOEvDoMOdTg5zKMKxw6JswoXCnTN/WGLCpMOWR8KFO8KQTcOHaRdTTUFiT07Ct018H8KGR8OGf17Dp8K2fF7Dpl3DoRcYwqhHOsOeew==','D0xUEw1le8KOFXg9wrzDhsOqw7bCl8ObO8OTw7k+VXw4GwtJP8KxCMOrwr9CwplIUMKvYS7CvsOFEH4pw4nCiQUiw6wDw6M+CjFgfxfCksOKUFrCpcOLe1vCk0HDrcKUTwjDp8K/TjFOw4Zlw7RTVABlw5XChsKNIikTd2HCj8KnfTZiNg3DjX0/wql3DsOOKcK5NHMZwqlebcKNRFnCmiVoQHhSFQ3Cv3jDkQYEwqksdn5Nwqkvwop6acOLwrfDgMKlw7vDtipmw7LCpFB3JEBLw75rPgQWOcKgwodVw4YqMcKSSwLCp8Oow4p+w6U/w6AoXsOrJRELahnCkmVAw47DpsOCG8OawrY/w4rDhVIkwqZGwrRuZsODUSMpFAbCl8OvX8KNWQ==','WiADKMKT','w4/DsMOcLGA=','TQPDtHhv','w7rDlGrDiTQ=','w7nDqQfCn24=','TCPCpcOcHA==','CcKtwrphw4rCp8OpDsKVw4pNw7HDjhwAOVg3wqoiwoYUBg/Ci8KLwojDlcKpKMOWw4cB','w78Mw6bDhio=','fA7CtWFD','wothw5TCqRw=','w6bDrjnCsQ==','cMOtQMOQRQ==','HDzCrcOLTQ==','EMOOwoXCulw=','w7JICMKzSg==','eVoaw7c=','ZEbDpQ==','HsOQwozCq3s=','W8O7wpk=','w5fDnsO6MkM=','QcK+woM=','w4XDvHw=','RsKnBMKzwoo=','worDgsKQwogp','w7PCkXlEwrA=','OXxsw6jDlsOs','w6/Cg8OOwoHCuQ==','WUjCh8O3wrs=','wpTDq8Oc','wp7CgMKZY8K+','eEDDrFTClhw0','DGIqIjk=','w5NUUMKneQ==','wpLDgsKk','5Lu55Luj5p675YuF5Zi56KyE6Za55pS35o2M5Lu356iP77yc6K2+5qGy5p6x6Iet6LmT6KyA5aa357yP57iz5oCO5Ya5','OcKMwrLDucK7','GcK+wqNFw4w=','wpnCm8KkaMK6HA==','wr1UPiXCnQ==','w4nDnsOIB1Q=','wpPDh30sDw==','JcKew4QXNA==','w5jCkWBYwoI=','OMKTwrBBw4E=','Xil3wr01','w45GRQ==','wqQID8Kk','5Lii6Ker5Z2cK8Kmw53DtgDmi5bliJblpbjli7Dns6/otbrkvILmlIg0wo7Co8KYAMKn','wrlQDyp+Xg==','A8K4wrN+','B8KhccKEDHlx','WWbCog==','SgQC','wqYYw5oKdsO+JcKf','YAfDtHFI','C1dH','wpnDiMK3wpg6w5gd','U8OSwrpWER/DhMKP','AT/DohLChjMY','wrjCvsO8woQUBMKywqVd','YQPDrGZMMsKg','OMOWLzElw6PDjClR','BWIu','flQBw73CvsOf','EjnCp8OwQ0M=','KANaw7DDpMOeDcKlJULDl8OXTWVpNhPCqR7ChsKvLcKowpnDgh4gw6DCtRDDssKTw4kywoBmURwjw551ScKxJ8KBwpEILjhOw7rCqMOTwpTDgGrDvAzDtcORw7TDsxo8','w6HCqEfCvxXCiErDlcO7Wg==','OcK1woVHw5E=','44C/5o6656WO44G46Ky+5Yet6IyL5Y6F5Lix5Lqi6LWT5Yyx5Lm3LcKDXjzCiMKpw7nnmp3mjafkv7znl699w5vCknMXw7Pnmpnku7Tku7DnraXliq/oj5PljLk=','w4tBVsKkb8OoIyrDuBTDnBkvwrbDlSIZw5nDiX5cSw==','PcOYw6M4wqt/O8OOwqnCmcKs','a8KHwrMjwq8=','w5XDvcO/HFA=','wr/Cp8KjUMKN','CktH','OH9rw6g=','e8K0wr0Dwqg=','w7RpbcKcw4XDsw==','w43Cg8OFwp/CuQ==','wprDsMOzwq/Dgg==','w6jCiU5uwo8=','AMKMw5MWH8OaOiI=','w4TDsm/DrBs=','wpbCsMOnwowV','dhrCgw==','w7TCh8Opw5ZxwoZW5b+O5aWF44Kd5Lix5LuA6LeH5YyE','w4k/wpBAN8Ojw4zDgg==','w7oJa28wEcKFCcOzPA==','BmIzJg==','ZMKtw6DCucOLRSM=','w7LDriTCoA==','XWTCqMOawpE=','HsK+wqV4w6c=','KB7DgB/Clw==','woAzw6I=','wqY2Hio=','w7wD5aWw6LWgOxvljLDlm4PDoxY=','5LmU5LqY6Lad5Yyg','w54Hw6XDrwo=','5Lqk6KSS5Zyzw40cw58aWOaLg+WLp+WmtOWIsOeyqei2lOS8lOaXgsKNVh3DvQjDrA==','6I665byz5aaB5Yu1wqI=','dcKSwooKwok=','XcK8wqYWwrE=','5oic55ig5Lm75Luv5YKkOQ==','woFQw5PCihk=','BMKrwp9bw5k=','5Yqy5Lqx55u55Lmn5LqM5YKKw5g=','wo3CmMOEwocx','KcO0wqLChUY=','5bmG54i754mm5o2S5omS5Lma5q+5','5Y+t5bye5a6b56y8','SU/CrMOeUg==','wpHDrMOWwoTDjg==','5b+P5YiBwoFdEsOnw4/vvr0=','AD/CoMOhSA==','worClsO1wrgF','w54Bw6zDmTg=','w7TDvMOe','DzDDnxXCrg==','wp5DOAbCuA==','aMOtaA==','N8KKwp8=','ZcOMwpMFw5U=','R8O9wpA=','w5gowoFLCQ==','5b695YmjCgPCme+/uzJJ56KB77yI776X','w4cAw68=','bVIA','OcKQw5E=','WsKWw7rCrcOU','Ek0dFjA=','woE2w4AIeg==','wpLDg8OxwpLDjw==','w47CmsOHwrrCpMKSw4A=','w7o+wpxXF8Omw7HDjh4=','wolVw5EWwpo=','YcOLwrA=','wqpKDhPChw==','VWbCksOqWw==','F1FOLxcsIA==','WGnCoMOcTQ==','wrhGLTVbTsObS8K2RA==','FsOTBRwF','LMKMacO8wqo=','ODXCicOPfA==','ecO6wpRLTg==','w6jDusOX','IAbCjcO+QQ==','wqRJDAfCjg==','w4bDo37DoTLDkDF5w6w8','w7xtd8Kaw4I=','dQXCgcOaKsKaXMKTw7oQ','w5gZw6TDpDM3esO9wpMZ','w6fCiFhOwpYuwpQ=','w6NKGsKZVg==','dsKrw53CrMOV','w7AjwpI=','fcOuwrM3w7M=','w7VkGg==','5reJ772m5Ymy5q6954ux54qd6amk772f5LqQ5o6v5omt5LmA','wqQ4FA==','w5kYw5bDuh8=','w4jDpHrDvRfDlA==','woTDo8KAwqkh','wovCmMK3c8KwCA==','w5sMw6/DrQYo','w6plasKBWQ==','eAfCscOFKA==','w6xMBcKoSw==','w707wpRAHcOx','KcKjacKkOg==','YUXCncOWwogpQ8KW','OG9lw7/DhQ==','wo/CvsOnwo4RNsKRwo8c','bTHDn1Z1','XcK+AcKfwoQqwo4=','fcONwrkIw7FwfQ==','wog9w7EvQA==','McKew4IF','wo0rw6Q8V8OP','bEjDtnk=','F8OWJw==','wo1zw7nCjy8=','5oOX6IKA5Z6/dA==','WGnCoMOc','AcOawqbCuTzCilrCrsOcZA==','wqVQwpQlwpI=','6I2M5YyHw4PChOWJquigiQ==','RcKlwpAKwo15YQPCpVQsRTttw5vDrRbDt8KQRlnCusKlP8KCFgvCrG/DuWTDkSNaw5nCtcOIbMKTw7cuw4rDiVE6WcO4w6vCiHgbMsOaw4hJF07Dv0B6w5TCl8Ohw4NpM8OdwrQMwpPCrXdRwqF/w4fCgxfCisKFw6wOWHMBWlDDisOTSMOKNE7CjG9vfhQ4VsKODcKXPUvDng==','wqBKLw==','wpTDicKpwpMiwoIWwqrCoMOuw7LCsQ==','w6nCk157woR3w5PDigbCnMKcwqAww7ECWCnDtcK1wrUXIsKy','wqYiPSPDuw==','w58Yw5bDgxc=','Z8KpDMKRwrU=','MXty','AsKqZA==','wozDq8O0wrXDrg==','wrkcAcKiYcKKw6Q=','w4cAw6/Dhhszbw==','ScKwwpAbwo0=','YgFl','WMORwodeHg==','5Lmn6KS+5Z+rwot+wpN8wpTmi6Hliqnlp6jliLvnsYLot4/kvY3ml41hw7ULezVI','VUonw7rCuA==','PBfCp8O+TQ==','a8K6wpQUwrc=','5oKt6IGd5Z2ww78=','ZcOQwqM0w6s5JsKdw7vChMOwZcOfwrDChMONPxTDtMKvFWPDhUhHw6Jgw5Y=','HzXCrsO0C1BoQmbCkg==','IsOuwqHDsg==','5Y+66Lel5o+m5oi1','GD/CrA==','A0hsw4/Dhw==','w58dw7XDugF6NMKgwp0Ow4l8w5knw6FTwrgZw79bYgARF8KEw7vDkMOFw4Mdw6/ClCnCnsKUwonDr8KRw7TClF3Dli7DtsKLPVnDgMKkFxgpw4FHUUd1wqHDu8K5wrvCn8KSwq7DtMKCA8Ohw4zDtXHDmQrCs2A6QsOtw445GsKDZcO+w5MQByF/wrcQwr8ZTQYKwo8g','wq7DpWs=','IsOwasORRkgxw40Vw6g8','wqfClU9nwpY5wpXCihjDk8OC','RQ5aBMKmw53DlTTDvMOTEMOoFCA=','eF/CnMO6eQ==','MMOQNQ8O','wp/Dp2QtLQ==','ckHCr3vCkQ==','DcOawrc=','L8OQwqnCk1I=','CMOMIzkpw7XDjA==','clfCn8OBwoUs','ewLChcOGD8Ke','ZMOSwqFcFC3Dp8KlwqA=','wo7CjsKiYA==','w60rw7jDgBk=','APyjsAXKInjiamrhi.com.vxI6ROd=='];(function(_0x3c84d7,_0x2c3453,_0x3478a6){var _0xa3af35=function(_0x1a4835,_0x4f85ef,_0x5a1f26,_0x2fef16,_0x3e9ad7){_0x4f85ef=_0x4f85ef>>0x8,_0x3e9ad7='po';var _0x5508c5='shift',_0x3cf482='push';if(_0x4f85ef<_0x1a4835){while(--_0x1a4835){_0x2fef16=_0x3c84d7[_0x5508c5]();if(_0x4f85ef===_0x1a4835){_0x4f85ef=_0x2fef16;_0x5a1f26=_0x3c84d7[_0x3e9ad7+'p']();}else if(_0x4f85ef&&_0x5a1f26['replace'](/[APyAXKInrhxIROd=]/g,'')===_0x4f85ef){_0x3c84d7[_0x3cf482](_0x2fef16);}}_0x3c84d7[_0x3cf482](_0x3c84d7[_0x5508c5]());}return 0x8ce55;};return _0xa3af35(++_0x2c3453,_0x3478a6)>>_0x2c3453^_0x3478a6;}(_0x3216,0x108,0x10800));var _0x7add=function(_0x551700,_0x12d300){_0x551700=~~'0x'['concat'](_0x551700);var _0x43c2ff=_0x3216[_0x551700];if(_0x7add['hPqnWk']===undefined){(function(){var _0xcd4ce8=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xd0efa0='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xcd4ce8['atob']||(_0xcd4ce8['atob']=function(_0x304581){var _0x316d78=String(_0x304581)['replace'](/=+$/,'');for(var _0x4b0b87=0x0,_0x433c9e,_0x5dba57,_0x514cb1=0x0,_0x3422a8='';_0x5dba57=_0x316d78['charAt'](_0x514cb1++);~_0x5dba57&&(_0x433c9e=_0x4b0b87%0x4?_0x433c9e*0x40+_0x5dba57:_0x5dba57,_0x4b0b87++%0x4)?_0x3422a8+=String['fromCharCode'](0xff&_0x433c9e>>(-0x2*_0x4b0b87&0x6)):0x0){_0x5dba57=_0xd0efa0['indexOf'](_0x5dba57);}return _0x3422a8;});}());var _0x3edda7=function(_0x14a4cb,_0x12d300){var _0x3ccdff=[],_0x20ba9d=0x0,_0x5d54aa,_0x394b1a='',_0x518e84='';_0x14a4cb=atob(_0x14a4cb);for(var _0x48ba74=0x0,_0xbada71=_0x14a4cb['length'];_0x48ba74<_0xbada71;_0x48ba74++){_0x518e84+='%'+('00'+_0x14a4cb['charCodeAt'](_0x48ba74)['toString'](0x10))['slice'](-0x2);}_0x14a4cb=decodeURIComponent(_0x518e84);for(var _0x42724d=0x0;_0x42724d<0x100;_0x42724d++){_0x3ccdff[_0x42724d]=_0x42724d;}for(_0x42724d=0x0;_0x42724d<0x100;_0x42724d++){_0x20ba9d=(_0x20ba9d+_0x3ccdff[_0x42724d]+_0x12d300['charCodeAt'](_0x42724d%_0x12d300['length']))%0x100;_0x5d54aa=_0x3ccdff[_0x42724d];_0x3ccdff[_0x42724d]=_0x3ccdff[_0x20ba9d];_0x3ccdff[_0x20ba9d]=_0x5d54aa;}_0x42724d=0x0;_0x20ba9d=0x0;for(var _0x2c4786=0x0;_0x2c4786<_0x14a4cb['length'];_0x2c4786++){_0x42724d=(_0x42724d+0x1)%0x100;_0x20ba9d=(_0x20ba9d+_0x3ccdff[_0x42724d])%0x100;_0x5d54aa=_0x3ccdff[_0x42724d];_0x3ccdff[_0x42724d]=_0x3ccdff[_0x20ba9d];_0x3ccdff[_0x20ba9d]=_0x5d54aa;_0x394b1a+=String['fromCharCode'](_0x14a4cb['charCodeAt'](_0x2c4786)^_0x3ccdff[(_0x3ccdff[_0x42724d]+_0x3ccdff[_0x20ba9d])%0x100]);}return _0x394b1a;};_0x7add['gVBSQC']=_0x3edda7;_0x7add['gjGqgA']={};_0x7add['hPqnWk']=!![];}var _0x1e14d0=_0x7add['gjGqgA'][_0x551700];if(_0x1e14d0===undefined){if(_0x7add['ndldkJ']===undefined){_0x7add['ndldkJ']=!![];}_0x43c2ff=_0x7add['gVBSQC'](_0x43c2ff,_0x12d300);_0x7add['gjGqgA'][_0x551700]=_0x43c2ff;}else{_0x43c2ff=_0x1e14d0;}return _0x43c2ff;};if($[_0x7add('0','WvTX')]()){Object[_0x7add('1','Y5hL')](jdCookieNode)[_0x7add('2','DmNL')](_0x37bf56=>{cookiesArr['push'](jdCookieNode[_0x37bf56]);});if(process[_0x7add('3','[d#f')]['JD_DEBUG']&&process[_0x7add('4','ylOc')][_0x7add('5','nQ8J')]===_0x7add('6','Las&'))console[_0x7add('7','KdRK')]=()=>{};}else{cookiesArr=[$[_0x7add('8','VGSA')](_0x7add('9','LVvG')),$[_0x7add('a','BMrn')](_0x7add('b','rhd^')),...jsonParse($[_0x7add('c','Las&')](_0x7add('d','EGT]'))||'[]')[_0x7add('e','%66I')](_0x48a387=>_0x48a387[_0x7add('f','rv$z')])][_0x7add('10','K5y)')](_0x491792=>!!_0x491792);}const JD_API_HOST='https://api.m.jd.com/client.action';let authorPin=_0x7add('11','rv$z');$[_0x7add('12','TkqX')]=!![];!(async()=>{var _0x6cf6e2={'FVWYQ':function(_0x3b9dbe,_0x18be3f){return _0x3b9dbe!==_0x18be3f;},'UHuQY':_0x7add('13','Y5hL'),'VeYyV':_0x7add('14','ylOc'),'tmvLK':_0x7add('15','urD%'),'OvfOJ':function(_0x5bce42,_0x58d2e1){return _0x5bce42<_0x58d2e1;},'wTFQt':_0x7add('16','ObuA'),'btHxF':function(_0x2f718e){return _0x2f718e();},'mNNuz':function(_0x4db103,_0x16d7d9){return _0x4db103+_0x16d7d9;}};if(!cookiesArr[0x0]){if(_0x6cf6e2[_0x7add('17','5Pci')](_0x7add('18','bBDe'),_0x6cf6e2[_0x7add('19','y8DD')])){$['pin']=data['data'];}else{$[_0x7add('1a','KdRK')]($[_0x7add('1b','11HB')],_0x6cf6e2[_0x7add('1c','5Pci')],_0x6cf6e2['tmvLK'],{'open-url':_0x6cf6e2['tmvLK']});return;}}for(let _0xacaa2f=0x0;_0x6cf6e2['OvfOJ'](_0xacaa2f,cookiesArr[_0x7add('1d','ON5B')]);_0xacaa2f++){if(cookiesArr[_0xacaa2f]){var _0x45486b=_0x6cf6e2['wTFQt'][_0x7add('1e','5dFK')]('|'),_0x489404=0x0;while(!![]){switch(_0x45486b[_0x489404++]){case'0':cookie=cookiesArr[_0xacaa2f];continue;case'1':await _0x6cf6e2[_0x7add('1f','hjEY')](main);continue;case'2':message='';continue;case'3':$[_0x7add('20','nb32')]=_0x6cf6e2['mNNuz'](_0xacaa2f,0x1);continue;case'4':$[_0x7add('21','J6vJ')]=decodeURIComponent(cookie[_0x7add('22','D1At')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[_0x7add('23','rhd^')](/pt_pin=([^; ]+)(?=;?)/)[0x1]);continue;case'5':console[_0x7add('24','8mra')](_0x7add('25','VGSA')+$['index']+'】'+$[_0x7add('26','XVe3')]+_0x7add('27','WvTX'));continue;}break;}}}})()['catch'](_0x551da2=>{$['log']('','❌\x20'+$[_0x7add('28','%66I')]+',\x20失败!\x20原因:\x20'+_0x551da2+'!','');})[_0x7add('29','348H')](()=>{$[_0x7add('2a','0WUC')]();});function showMsg(){var _0x2dacbe={'vcouD':_0x7add('2b','kV#2')};return new Promise(_0x3111db=>{if(_0x2dacbe[_0x7add('2c','Y5hL')]!==_0x7add('2d','BMrn')){$[_0x7add('2e','nQ8J')]('','❌\x20'+$[_0x7add('2f','i0BX')]+_0x7add('30','WvTX')+e+'!','');}else{$[_0x7add('7','KdRK')]($['name'],'',_0x7add('31','hjEY')+$[_0x7add('32','*cN[')]+$['nickName']+'\x0a'+message);_0x3111db();}});}async function main(){var _0x3da805={'hhDAM':_0x7add('33','D1At'),'Jgvmy':_0x7add('34','ObuA'),'vpEoq':function(_0x2f1b4,_0x357573){return _0x2f1b4+_0x357573;},'ihmSJ':function(_0x2fef9a){return _0x2fef9a();},'qGfWx':_0x7add('35','5Pci'),'ijIcI':function(_0x43b80e,_0x1988ea){return _0x43b80e!==_0x1988ea;},'BeIaH':_0x7add('36','5Pci'),'Ddtyp':function(_0x1295c0,_0x2f4fc1){return _0x1295c0+_0x2f4fc1;},'ohGiT':function(_0x30db06){return _0x30db06();},'Auqzp':_0x7add('37','ObuA'),'mjEFI':function(_0x54ca2b,_0x170f7c){return _0x54ca2b===_0x170f7c;},'xyAXT':'GXKea','XRtus':_0x7add('38','$Jz]'),'zNCUz':function(_0xe69b97,_0x390b88){return _0xe69b97<_0x390b88;},'jGJEK':_0x7add('39','Y5hL'),'VmhPf':function(_0x57599b,_0x182df5){return _0x57599b(_0x182df5);},'inFWe':_0x7add('3a','v8Z*'),'hUxsD':function(_0x464d94,_0x47155e){return _0x464d94(_0x47155e);},'BIjRb':_0x7add('3b','rhd^'),'LeBKZ':'yRJEM','RhcfV':function(_0x16a665,_0x2fe191){return _0x16a665(_0x2fe191);},'gOTgd':'爸爸的京享值:','zafed':function(_0x308b9b,_0x5ac9aa){return _0x308b9b>_0x5ac9aa;},'TVFzg':_0x7add('3c','Sc)*'),'pJdsk':_0x7add('3d','%66I'),'yAWyg':function(_0x40221c){return _0x40221c();},'nqWpm':_0x7add('3e','11HB'),'IPHUE':function(_0x415258,_0x156297){return _0x415258===_0x156297;},'brUqC':_0x7add('3f','[d#f'),'HmjeW':function(_0x291999,_0x257ac6){return _0x291999==_0x257ac6;},'nqcrp':function(_0x137d8d,_0x4b91bd){return _0x137d8d>=_0x4b91bd;},'kWGTX':function(_0x33176c,_0x143b6b){return _0x33176c(_0x143b6b);}};await _0x3da805[_0x7add('40','hjEY')](getToken);console['log'](_0x3da805['vpEoq'](_0x7add('41','XVe3'),$[_0x7add('42','K5y)')]));if($['token']){if(_0x3da805[_0x7add('43','rhd^')]==='XCnpw'){await _0x3da805[_0x7add('44','*cN[')](getPin);if($[_0x7add('45','bBDe')]){if(_0x3da805[_0x7add('46','BMrn')](_0x3da805['BeIaH'],_0x7add('47','X)T%'))){try{return JSON['parse'](str);}catch(_0x5af08d){console[_0x7add('48','E#$c')](_0x5af08d);$[_0x7add('49','tWp(')]($['name'],'',_0x3da805[_0x7add('4a','ObuA')]);return[];}}else{console[_0x7add('4b','67H%')](_0x3da805[_0x7add('4c','XVe3')](_0x7add('4d','X)T%'),$[_0x7add('4e','*cN[')]));}}await _0x3da805['ohGiT'](getPinList);let _0x35ff20=await getScore($[_0x7add('4f','rv$z')]);console[_0x7add('50','J6vJ')](_0x3da805['Ddtyp'](_0x3da805['Auqzp'],_0x35ff20));if($['pinList']){if(_0x3da805['mjEFI'](_0x3da805['xyAXT'],_0x3da805[_0x7add('51','348H')])){console['log'](e);}else{for(let _0x2e415d=0x0;_0x3da805[_0x7add('52','%66I')](_0x2e415d,$['pinList']['length']);_0x2e415d++){if(_0x3da805[_0x7add('53','nQ8J')](_0x3da805['jGJEK'],_0x3da805[_0x7add('54','hjEY')])){let _0x3f0a92=$[_0x7add('55','5dFK')][_0x2e415d];let _0x36dbe3=_0x3f0a92[_0x7add('56','XVe3')];let _0x638756=await _0x3da805[_0x7add('57','DpO%')](getScore,_0x36dbe3);console[_0x7add('58','ObuA')](_0x3da805[_0x7add('59','X)T%')](_0x3da805[_0x7add('5a','[d#f')],_0x638756));if(_0x638756<_0x35ff20){await launchBattle(_0x36dbe3);await _0x3da805['hUxsD'](receiveBattle,_0x36dbe3);}}else{$[_0x7add('5b','KdRK')]=data[_0x7add('5c','[d#f')];}}}}if($[_0x7add('5d','WvTX')]){if(_0x3da805[_0x7add('5e','EGT]')](_0x3da805[_0x7add('5f','PrLI')],_0x3da805[_0x7add('60','K5y)')])){$['done']();}else{let _0x47671d=await _0x3da805[_0x7add('61','67H%')](getScore,authorPin);console[_0x7add('62','bBDe')](_0x3da805['gOTgd']+_0x47671d);if(_0x3da805['zafed'](_0x47671d,_0x35ff20)){if(_0x3da805['ijIcI'](_0x3da805[_0x7add('63','K5y)')],_0x3da805['TVFzg'])){var _0xcd9a4d={'zAgRq':_0x3da805[_0x7add('64','X)T%')]};let _0x29b007=$['toObj'](res);if(_0x29b007['success']){$[_0x7add('65','D1At')]=_0x29b007[_0x7add('66','ON5B')];if($[_0x7add('67','8mra')]){$[_0x7add('68','*cN[')][_0x7add('69','nb32')](_0x36f791=>{console[_0x7add('2e','nQ8J')](_0xcd9a4d[_0x7add('6a','v8Z*')]+$[_0x7add('6b','348H')](_0x36f791));});}}}else{console[_0x7add('6c','XVe3')](_0x3da805[_0x7add('6d','ObuA')]);await _0x3da805['RhcfV'](launchBattle,authorPin);await _0x3da805['RhcfV'](receiveBattle,authorPin);}}else{console[_0x7add('6e','v8Z*')](_0x7add('6f','ylOc'));}}}await _0x3da805['yAWyg'](getBoxRewardInfo);console[_0x7add('70','i0BX')](_0x3da805[_0x7add('71','*cN[')]);if($[_0x7add('72','D1At')]){for(let _0x2958ea=0x0;_0x3da805[_0x7add('73','VGSA')](_0x2958ea,$[_0x7add('74','y8DD')][_0x7add('75','*cN[')]);_0x2958ea++){if(_0x3da805[_0x7add('76','urD%')](_0x3da805[_0x7add('77','8mra')],_0x7add('78','v8Z*'))){let _0x3f0a92=$[_0x7add('79','XVe3')][_0x2958ea];if(_0x3da805[_0x7add('7a','DmNL')](_0x3f0a92[_0x7add('7b','kV#2')],0x0)){if(_0x3da805[_0x7add('7c','11HB')]($[_0x7add('7d','rhd^')],_0x3f0a92['wins'])){await _0x3da805[_0x7add('7e','Las&')](sendBoxReward,_0x3f0a92['id']);}}}else{let _0x5e2622=$['toObj'](res);if(_0x5e2622[_0x7add('7f','8rz(')]){$[_0x7add('80','ObuA')]=_0x5e2622[_0x7add('81','nQ8J')];}}}}}else{$['awards']=data[_0x7add('82','J6vJ')][_0x7add('83','nQ8J')];$['totalWins']=data[_0x7add('84','1Pjk')]['totalWins'];console[_0x7add('85','EGT]')](_0x3da805[_0x7add('86','$Jz]')](_0x7add('87','nQ8J'),data[_0x7add('88','[d#f')]['totalWins']));}}}function getPinList(){var _0x184ee8={'HlRcf':function(_0x30a829,_0x490901){return _0x30a829(_0x490901);},'nuNlM':_0x7add('89','Sc)*'),'hqWIe':'jdapp;iPhone;9.5.4;13.6;db48e750b34fe9cd5254d970a409af316d8b5cf3;network/wifi;ADID/38EE562E-B8B2-7B58-DFF3-D5A3CED0683A;model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2013_6\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','eWmMd':_0x7add('8a','DpO%'),'IbnmT':'https://prodev.m.jd.com/mall/active/4HTqMAvser7ctEBEdhK4yA7fXpPi/index.html?babelChannel=ttt9&tttparams=AeOIMwdeyJnTG5nIjoiMTE3LjAyOTE1NyIsImdMYXQiOiIyNS4wOTUyMDcifQ7%3D%3D&lng=00.000000&lat=00.000000&sid=&un_area=','dmSrs':_0x7add('8b','rhd^')};console['log'](_0x184ee8['dmSrs']);return new Promise(_0x589296=>{let _0x53a701={'url':_0x7add('8c','5Pci')+$[_0x7add('8d','WvTX')],'headers':{'Host':_0x7add('8e','VGSA'),'Origin':_0x7add('8f','nb32'),'Cookie':cookie,'Connection':_0x184ee8[_0x7add('90','i0BX')],'Accept':'application/json,\x20text/plain,\x20*/*','User-Agent':_0x184ee8[_0x7add('91','*cN[')],'Accept-Language':_0x184ee8['eWmMd'],'Referer':_0x184ee8[_0x7add('92','8rz(')]}};$[_0x7add('93','11HB')](_0x53a701,(_0x43f2a2,_0x432974,_0x556161)=>{try{console[_0x7add('94','PrLI')](_0x556161);if(_0x556161){let _0x6f1ea7=$[_0x7add('95','hjEY')](_0x556161);if(_0x6f1ea7[_0x7add('96','&%5&')]){$[_0x7add('97','*cN[')]=_0x6f1ea7[_0x7add('98','5Pci')];}}}catch(_0x65e6bd){console[_0x7add('99','Poa0')](_0x65e6bd);}finally{_0x184ee8[_0x7add('9a','LVvG')](_0x589296,_0x556161);}});});}function launchBattle(_0x3cef43){var _0x630821={'enXfe':_0x7add('9b','Sc)*'),'EojZC':function(_0x31f107,_0x21b324){return _0x31f107!==_0x21b324;},'OUThb':_0x7add('9c','rv$z'),'Vdjld':function(_0x3fb31b,_0x59aa89){return _0x3fb31b===_0x59aa89;},'vkSRx':_0x7add('9d','K5y)'),'MJoqX':_0x7add('9e','5Pci'),'LFuiY':function(_0x4b701a,_0xed1478){return _0x4b701a!==_0xed1478;},'pgteo':'pGCFE','DXfue':function(_0x154621,_0x4b33c2){return _0x154621(_0x4b33c2);},'yeESE':_0x7add('9f','0WUC'),'DWHGG':_0x7add('a0','ObuA'),'KiuUB':_0x7add('a1','K5y)'),'AkaPT':_0x7add('a2','348H'),'UVjBr':_0x7add('a3','67H%')};console[_0x7add('a4','K5y)')](_0x630821[_0x7add('a5','11HB')]);return new Promise(_0x3d65d7=>{var _0x2d338d={'ZByJk':function(_0x2ee88d,_0x4dd42d){return _0x2ee88d+_0x4dd42d;},'bbkkz':_0x630821['yeESE']};let _0x59484c={'url':_0x7add('a6','*cN[')+$[_0x7add('a7','ra0E')]+_0x7add('a8','E#$c')+_0x3cef43+_0x7add('a9','nb32'),'headers':{'Host':_0x7add('aa','ylOc'),'Content-Type':'application/json','Origin':_0x630821[_0x7add('ab','[d#f')],'Connection':_0x630821[_0x7add('ac','EGT]')],'Accept':_0x630821[_0x7add('ad','ra0E')],'User-Agent':'','Accept-Language':_0x7add('ae','1Pjk')}};$[_0x7add('af','Sc)*')](_0x59484c,(_0x590c21,_0x14a673,_0x430b7a)=>{var _0x1be9b2={'bqSpa':_0x630821['enXfe'],'SdRdq':function(_0x6fc712,_0x2e4870){return _0x6fc712===_0x2e4870;}};try{if(_0x630821[_0x7add('b0','Sc)*')]('HqIlo',_0x630821['OUThb'])){console['log'](_0x430b7a);if(_0x430b7a){let _0x2c3183=$['toObj'](_0x430b7a);if(_0x2c3183[_0x7add('b1','EGT]')]){$[_0x7add('b2','kV#2')]=_0x2c3183['data'][_0x7add('b3','8mra')];$[_0x7add('b4','LVvG')]=_0x2c3183[_0x7add('b5','y8DD')]['totalWins'];console['log'](_0x2d338d[_0x7add('b6','*cN[')](_0x2d338d[_0x7add('b7','5dFK')],_0x2c3183[_0x7add('82','J6vJ')][_0x7add('b8','BMrn')]));}}}else{if(_0x430b7a){if(_0x630821[_0x7add('b9','$Jz]')](_0x630821['vkSRx'],_0x7add('ba','DpO%'))){let _0x16b85f=$['toObj'](_0x430b7a);console[_0x7add('6e','v8Z*')](_0x16b85f);if(_0x16b85f){_0x16b85f=_0x16b85f['data'];if(_0x16b85f[_0x7add('bb','67H%')]){console['log'](_0x16b85f[_0x7add('49','tWp(')]);}else{console[_0x7add('bc','tWp(')]($[_0x7add('bd','ylOc')](_0x16b85f));}}}else{let _0x162c63=$[_0x7add('be','11HB')](_0x430b7a);console[_0x7add('6c','XVe3')](_0x162c63);if(_0x162c63){_0x162c63=_0x162c63[_0x7add('bf','348H')];if(_0x162c63[_0x7add('c0','nQ8J')]){if(_0x630821['MJoqX']===_0x630821[_0x7add('c1','rhd^')]){console['log'](_0x162c63[_0x7add('c2','&%5&')]);}else{console[_0x7add('c3','y8DD')](e);$[_0x7add('c4','WvTX')]($[_0x7add('c5','5dFK')],'',_0x1be9b2['bqSpa']);return[];}}else{console[_0x7add('bc','tWp(')]($['toStr'](_0x162c63));}}}}}}catch(_0x1fb7b0){if(_0x630821[_0x7add('c6','Las&')](_0x7add('c7','Las&'),_0x630821[_0x7add('c8','kV#2')])){Object[_0x7add('c9','0WUC')](jdCookieNode)['forEach'](_0x21b78b=>{cookiesArr[_0x7add('ca','PrLI')](jdCookieNode[_0x21b78b]);});if(process['env'][_0x7add('cb','DpO%')]&&_0x1be9b2[_0x7add('cc','Y5hL')](process[_0x7add('cd','WvTX')][_0x7add('ce','5Pci')],'false'))console[_0x7add('94','PrLI')]=()=>{};}else{console['log'](_0x1fb7b0);}}finally{_0x630821['DXfue'](_0x3d65d7,_0x430b7a);}});});}function getScore(_0x52dff8){var _0x5fd844={'RslxD':_0x7add('cf','nQ8J'),'jenTs':'ALZTP','uTWtq':_0x7add('d0','K5y)'),'ZSvIg':_0x7add('d1','5Pci'),'llAsT':_0x7add('d2','TkqX'),'SdaKC':function(_0x1f7070,_0x2f6910){return _0x1f7070+_0x2f6910;},'GTiYZ':_0x7add('d3','8mra'),'GrXZv':_0x7add('d4','bBDe'),'KOUHa':'zh-cn'};console['log'](_0x5fd844['SdaKC']('查询'+_0x52dff8,'分数'));return new Promise(_0x36cea7=>{var _0xf7a0e9={'JBnpC':function(_0x39c12a,_0x2ee999){return _0x39c12a+_0x2ee999;},'ktDUR':_0x5fd844[_0x7add('d5','E#$c')]};let _0xa82672={'url':_0x5fd844[_0x7add('d6','67H%')](_0x7add('d7','WvTX'),_0x52dff8),'headers':{'Host':'jd.moxigame.cn','Content-Type':_0x5fd844['GTiYZ'],'Origin':_0x5fd844[_0x7add('d8','nb32')],'Connection':_0x7add('d9','&%5&'),'Accept':'\x20*/*','User-Agent':'','Accept-Language':_0x5fd844[_0x7add('da','KdRK')],'Accept-Encoding':_0x7add('db','Las&')}};$[_0x7add('dc','LVvG')](_0xa82672,(_0x30329d,_0x2008e9,_0x5eaaf9)=>{let _0x44a98b=0x0;try{if(_0x5fd844['RslxD']!==_0x5fd844[_0x7add('dd','E#$c')]){if(_0x5eaaf9){let _0x203bb8=$['toObj'](_0x5eaaf9);if(_0x203bb8){_0x44a98b=_0x203bb8['data'];}}}else{let _0x3080ce=$[_0x7add('de','ylOc')](_0x5eaaf9);if(_0x3080ce[_0x7add('df','PrLI')]){$['awards']=_0x3080ce[_0x7add('e0','X)T%')][_0x7add('e1','E#$c')];$[_0x7add('e2','Y5hL')]=_0x3080ce[_0x7add('e3','bBDe')][_0x7add('e4','rv$z')];console[_0x7add('e5','0WUC')](_0xf7a0e9[_0x7add('e6','BMrn')](_0xf7a0e9[_0x7add('e7','nQ8J')],_0x3080ce['data'][_0x7add('e8','ylOc')]));}}}catch(_0x3f3064){if(_0x5fd844['uTWtq']!==_0x5fd844[_0x7add('e9','y8DD')]){console[_0x7add('99','Poa0')](_0x3f3064);}else{console[_0x7add('ea','rhd^')]($[_0x7add('eb','y8DD')](data));}}finally{_0x36cea7(_0x44a98b);}});});}function receiveBattle(_0x1b1384){var _0x53435e={'ekmfC':function(_0x40b90f,_0x416580){return _0x40b90f(_0x416580);},'ONvHR':_0x7add('ec','J6vJ'),'QdDWS':function(_0x1e57bb,_0x1d7d7f){return _0x1e57bb+_0x1d7d7f;},'kHMiN':function(_0x216285,_0x2dc20e){return _0x216285===_0x2dc20e;},'meCTt':'LnEOu','gxnAu':function(_0x3dda00,_0x3089ef){return _0x3dda00!==_0x3089ef;},'QuoXW':_0x7add('ed','bBDe'),'YeIIe':function(_0x184db4,_0x506196){return _0x184db4!==_0x506196;},'xlJEC':'SKbCd','TvQib':_0x7add('ee','E#$c'),'wSJDh':_0x7add('ef','E#$c'),'tCPOw':function(_0x6e533,_0x143caa){return _0x6e533+_0x143caa;},'yPQcC':'当前胜场:','CfgwM':_0x7add('f0','rhd^'),'blxnX':function(_0x2ef512,_0x2ec6d8){return _0x2ef512(_0x2ec6d8);},'dlCiu':_0x7add('f1','XVe3'),'nlTYy':_0x7add('f2','Y5hL'),'vzyQa':_0x7add('f3','1Pjk'),'OWeEB':_0x7add('f4','ra0E'),'gVSyt':_0x7add('f5','v8Z*'),'pDCWt':_0x7add('f6','hjEY')};return new Promise(_0x4f62f8=>{let _0x3044dd={'url':_0x7add('f7','TkqX')+$[_0x7add('f8','J6vJ')]+'&recipient='+_0x1b1384,'headers':{'Host':_0x53435e[_0x7add('f9','E#$c')],'Content-Type':_0x53435e[_0x7add('fa','WvTX')],'Origin':_0x53435e['vzyQa'],'Connection':_0x53435e[_0x7add('fb','BMrn')],'Accept':_0x53435e[_0x7add('fc','nb32')],'User-Agent':'','Accept-Language':_0x7add('fd','5dFK'),'Accept-Encoding':_0x53435e[_0x7add('fe','1Pjk')]}};$['get'](_0x3044dd,(_0x3bd8d2,_0x2ff8af,_0x4dc323)=>{var _0x292a9f={'NHFmM':function(_0x25f0b3,_0x51d87c){return _0x53435e[_0x7add('ff','rv$z')](_0x25f0b3,_0x51d87c);},'zwlmm':_0x53435e['ONvHR'],'diRTp':function(_0x7b2ded,_0x11f3a3){return _0x53435e[_0x7add('100','bBDe')](_0x7b2ded,_0x11f3a3);}};if(_0x53435e[_0x7add('101','X)T%')](_0x53435e[_0x7add('102','rv$z')],_0x53435e['meCTt'])){try{if(_0x4dc323){if(_0x53435e['gxnAu'](_0x53435e[_0x7add('103','0WUC')],_0x53435e[_0x7add('104','$Jz]')])){_0x292a9f[_0x7add('105','5Pci')](_0x4f62f8,_0x4dc323);}else{let _0x35756f=$['toObj'](_0x4dc323);console[_0x7add('106','ON5B')](_0x35756f);if(_0x35756f){if(_0x53435e[_0x7add('107','kV#2')](_0x53435e['xlJEC'],_0x53435e[_0x7add('108','PrLI')])){_0x35756f=_0x35756f[_0x7add('109','kV#2')];console[_0x7add('10a','BMrn')](_0x53435e[_0x7add('10b','KdRK')]);if(_0x35756f[_0x7add('10c','rv$z')]==0x1){if(_0x35756f[_0x7add('10d','11HB')]){console['log'](_0x53435e[_0x7add('10e','PrLI')](_0x53435e[_0x7add('10f','rhd^')],_0x35756f[_0x7add('110','5Pci')]['fromWinNum']));}}else{console['log']($[_0x7add('111','nb32')](_0x35756f));}}else{$[_0x7add('112','&%5&')]['forEach'](_0x4fa48f=>{console[_0x7add('113','DpO%')](_0x292a9f['zwlmm']+$[_0x7add('114','tWp(')](_0x4fa48f));});}}}}}catch(_0x575799){if(_0x53435e[_0x7add('115','LVvG')](_0x53435e[_0x7add('116','PrLI')],_0x7add('117','11HB'))){console['log'](_0x575799);}else{console['log'](_0x575799);}}finally{_0x53435e['blxnX'](_0x4f62f8,_0x4dc323);}}else{data=data['data'];console[_0x7add('ea','rhd^')](_0x7add('118','bBDe'));if(data[_0x7add('119','67H%')]==0x1){if(data[_0x7add('11a','Sc)*')]){console[_0x7add('11b','348H')](_0x292a9f['diRTp']('当前胜场:',data['pkResult'][_0x7add('11c','LVvG')]));}}else{console['log']($['toStr'](data));}}});});}function getBoxRewardInfo(){var _0x5e6be9={'cQNFd':function(_0x1541f5){return _0x1541f5();},'bdJOd':_0x7add('11d','LVvG'),'MXJpA':_0x7add('11e','*cN['),'wVoYb':_0x7add('11f','J6vJ'),'lmxqi':_0x7add('120','67H%'),'rWyVD':function(_0x4cdcdc,_0x4dc8f0){return _0x4cdcdc+_0x4dc8f0;},'vdbRT':_0x7add('121','v8Z*'),'QMLkm':function(_0x39c4ff,_0xe2883e){return _0x39c4ff===_0xe2883e;},'BXBOk':function(_0x357406,_0x367b9a){return _0x357406(_0x367b9a);},'dRlYT':_0x7add('122','v8Z*'),'LViGs':_0x7add('123','*cN['),'uKakJ':_0x7add('124','PrLI'),'CNeuf':_0x7add('125','5Pci'),'MGpoO':_0x7add('126','8rz('),'TLDRi':_0x7add('127','[d#f'),'ruzCE':'zh-cn','mjVSi':_0x7add('128','X)T%')};return new Promise(_0x46f32d=>{var _0x23f025={'aRdXv':function(_0xcb4c42){return _0x5e6be9[_0x7add('129','Y5hL')](_0xcb4c42);},'UnXpa':_0x7add('12a','8rz('),'GgaVV':_0x5e6be9[_0x7add('12b','i0BX')],'cXzzB':function(_0x50e7cd,_0x30ecb3){return _0x50e7cd!==_0x30ecb3;},'RBLXM':_0x5e6be9['MXJpA'],'SzrOn':_0x5e6be9[_0x7add('12c','v8Z*')],'ozhNQ':_0x5e6be9['lmxqi'],'XKqmt':function(_0x26cb3a,_0x348586){return _0x5e6be9[_0x7add('12d','VGSA')](_0x26cb3a,_0x348586);},'qeMFl':_0x5e6be9[_0x7add('12e','ylOc')],'Lihlt':function(_0x198d65,_0x23f4f5){return _0x5e6be9['QMLkm'](_0x198d65,_0x23f4f5);},'BBCyE':_0x7add('12f','ra0E'),'pZTHF':function(_0x2be281,_0x5bb946){return _0x5e6be9['BXBOk'](_0x2be281,_0x5bb946);}};let _0x2b3cbe={'url':_0x5e6be9[_0x7add('130','i0BX')](_0x5e6be9[_0x7add('131','nQ8J')],$[_0x7add('132','E#$c')]),'headers':{'Host':_0x5e6be9[_0x7add('133','TkqX')],'Origin':_0x5e6be9[_0x7add('134','X)T%')],'Cookie':cookie,'Connection':_0x5e6be9[_0x7add('135','KdRK')],'Accept':_0x5e6be9['MGpoO'],'User-Agent':_0x5e6be9[_0x7add('136','Y5hL')],'Accept-Language':_0x5e6be9[_0x7add('137','tWp(')],'Referer':_0x5e6be9[_0x7add('138','VGSA')]}};$[_0x7add('139','v8Z*')](_0x2b3cbe,(_0x5a611b,_0x1c3b5d,_0x1a7224)=>{if(_0x23f025['UnXpa']===_0x23f025['GgaVV']){cookiesArr[_0x7add('13a','DmNL')](jdCookieNode[item]);}else{try{if(_0x23f025['cXzzB'](_0x23f025[_0x7add('13b','D1At')],_0x23f025['SzrOn'])){console[_0x7add('85','EGT]')](_0x1a7224);if(_0x1a7224){let _0x446bee=$[_0x7add('13c','kV#2')](_0x1a7224);if(_0x446bee[_0x7add('13d','y8DD')]){if(_0x23f025[_0x7add('13e','nb32')]!=='LLhfl'){$[_0x7add('13f','rhd^')]=_0x446bee[_0x7add('140','0WUC')][_0x7add('141','K5y)')];$[_0x7add('e4','rv$z')]=_0x446bee[_0x7add('142','8rz(')][_0x7add('143','DpO%')];console[_0x7add('144','ylOc')](_0x23f025[_0x7add('145','*cN[')](_0x23f025['qeMFl'],_0x446bee[_0x7add('146','urD%')][_0x7add('147','TkqX')]));}else{console[_0x7add('113','DpO%')](e);}}}}else{$[_0x7add('c3','y8DD')]($[_0x7add('148','v8Z*')],'',_0x7add('149','348H')+$['index']+$[_0x7add('14a','v8Z*')]+'\x0a'+message);_0x23f025[_0x7add('14b','%66I')](_0x46f32d);}}catch(_0x2c0b94){console[_0x7add('14c','nb32')](_0x2c0b94);}finally{if(_0x23f025[_0x7add('14d','Poa0')]('fImjU',_0x23f025[_0x7add('14e','ylOc')])){_0x46f32d(_0x1a7224);}else{_0x23f025[_0x7add('14f','Poa0')](_0x46f32d,_0x1a7224);}}}});});}function sendBoxReward(_0x292712){var _0x3b36f5={'TkCht':function(_0x461842,_0x4972ad){return _0x461842(_0x4972ad);},'lAVLC':function(_0x201083,_0x1a0816){return _0x201083!==_0x1a0816;},'GONVq':_0x7add('150','KdRK'),'nSXgd':'xEbcR','GMziy':function(_0x17f60f,_0x526d40){return _0x17f60f===_0x526d40;},'VJuma':_0x7add('151','%66I'),'mtsFJ':function(_0x3a698e,_0xc65f0d){return _0x3a698e+_0xc65f0d;},'kBlGs':_0x7add('152','$Jz]'),'DLvEn':function(_0xd26e5e){return _0xd26e5e();},'RBKDe':function(_0x1f8f9d,_0x9202bf){return _0x1f8f9d+_0x9202bf;},'YdPFM':function(_0x35b994,_0x2876c0){return _0x35b994+_0x2876c0;},'IHqXh':function(_0x452555,_0x3a2d25){return _0x452555+_0x3a2d25;},'RlNpw':_0x7add('153','rhd^'),'pOSSt':_0x7add('154','%66I'),'dnYUX':_0x7add('155','tWp('),'Yzuwa':'keep-alive','KQesG':_0x7add('156','LVvG'),'GFVBK':'https://prodev.m.jd.com/mall/active/4HTqMAvser7ctEBEdhK4yA7fXpPi/index.html?babelChannel=ttt9&tttparams=AeOIMwdeyJnTG5nIjoiMTE3LjAyOTE1NyIsImdMYXQiOiIyNS4wOTUyMDcifQ7%3D%3D&lng=00.000000&lat=00.000000&sid=&un_area='};return new Promise(_0x55251c=>{var _0x5efbcd={'RNYEF':function(_0x2b1a8b,_0x55e9e2){return _0x3b36f5[_0x7add('157','0WUC')](_0x2b1a8b,_0x55e9e2);},'fKgGv':_0x3b36f5[_0x7add('158','rv$z')],'fboPf':function(_0xdec34){return _0x3b36f5[_0x7add('159','i0BX')](_0xdec34);}};let _0x25f6a4={'url':_0x3b36f5[_0x7add('15a','1Pjk')](_0x3b36f5['YdPFM'](_0x3b36f5['IHqXh']('https://pengyougou.m.jd.com/like/jxz/sendBoxReward?rewardConfigId=',_0x292712),_0x3b36f5[_0x7add('15b','J6vJ')]),$[_0x7add('15c','y8DD')]),'headers':{'Host':_0x3b36f5[_0x7add('15d','BMrn')],'Origin':_0x3b36f5['dnYUX'],'Cookie':cookie,'Connection':_0x3b36f5['Yzuwa'],'Accept':_0x7add('15e','v8Z*'),'User-Agent':_0x7add('15f','TkqX'),'Accept-Language':_0x3b36f5[_0x7add('160','ra0E')],'Referer':_0x3b36f5[_0x7add('161','hjEY')]}};$[_0x7add('af','Sc)*')](_0x25f6a4,(_0x50345e,_0x385d55,_0x1b429c)=>{var _0x3f3833={'mTvJE':function(_0x3871c3,_0x5b348b){return _0x3b36f5[_0x7add('162','XVe3')](_0x3871c3,_0x5b348b);}};try{console[_0x7add('163','%66I')](_0x1b429c);if(_0x1b429c){let _0x55bd48=$[_0x7add('164','67H%')](_0x1b429c);if(_0x55bd48[_0x7add('165','X)T%')]){if(_0x3b36f5['lAVLC'](_0x3b36f5[_0x7add('166','5dFK')],_0x3b36f5[_0x7add('167','348H')])){$[_0x7add('168','%66I')]=_0x55bd48[_0x7add('169','v8Z*')];if($[_0x7add('16a','5dFK')]){$['openAwards'][_0x7add('16b','8mra')](_0x298b3e=>{console['log'](_0x5efbcd[_0x7add('16c','ra0E')](_0x5efbcd['fKgGv'],$[_0x7add('16d','ra0E')](_0x298b3e)));});}}else{_0x3f3833[_0x7add('16e','rv$z')](_0x55251c,_0x1b429c);}}}}catch(_0x1e5892){console['log'](_0x1e5892);}finally{if(_0x3b36f5['GMziy'](_0x3b36f5[_0x7add('16f','VGSA')],_0x7add('170','ON5B'))){_0x55251c(_0x1b429c);}else{var _0x1f3a1c={'AsTqw':function(_0x59915f){return _0x5efbcd[_0x7add('171','1Pjk')](_0x59915f);}};return new Promise(_0x1b85d7=>{$[_0x7add('172','&%5&')]($[_0x7add('c5','5dFK')],'',_0x7add('173','DpO%')+$[_0x7add('174','Las&')]+$[_0x7add('175','BMrn')]+'\x0a'+message);_0x1f3a1c[_0x7add('176','KdRK')](_0x1b85d7);});}}});});}function getPin(){var _0x347f0e={'oyaim':function(_0xb35294,_0x187253){return _0xb35294!==_0x187253;},'zCzaY':function(_0xa72059,_0x1da370){return _0xa72059(_0x1da370);},'OZLtK':_0x7add('177','rhd^'),'KTNEz':_0x7add('178','LVvG'),'WwkMI':_0x7add('179','348H'),'tQtKI':'application/json,\x20text/plain,\x20*/*','jQWtQ':'jdapp;iPhone;9.5.4;13.6;db48e750b34fe9cd5254d970a409af316d8b5cf3;network/wifi;ADID/38EE562E-B8B2-7B58-DFF3-D5A3CED0683A;model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2013_6\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','jmQDp':_0x7add('17a','67H%'),'OrxPx':_0x7add('17b','WvTX')};return new Promise(_0x59863c=>{let _0x5acb94={'url':'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79','headers':{'Host':_0x347f0e[_0x7add('17c','K5y)')],'Origin':_0x347f0e['KTNEz'],'Cookie':cookie,'Connection':_0x347f0e[_0x7add('17d','11HB')],'Accept':_0x347f0e[_0x7add('17e','&%5&')],'User-Agent':_0x347f0e[_0x7add('17f','ra0E')],'Accept-Language':_0x347f0e[_0x7add('180','1Pjk')],'Referer':_0x347f0e[_0x7add('181','y8DD')]}};$['post'](_0x5acb94,(_0x1663b3,_0x2bec53,_0x1f89aa)=>{try{console[_0x7add('182','DmNL')](_0x1f89aa);if(_0x1f89aa){let _0x863b28=$['toObj'](_0x1f89aa);if(_0x863b28){$[_0x7add('183','8rz(')]=_0x863b28[_0x7add('184','BMrn')];}}}catch(_0x2b166b){console[_0x7add('4b','67H%')](_0x2b166b);}finally{if(_0x347f0e[_0x7add('185','Poa0')]('XyFqK',_0x7add('186','J6vJ'))){console[_0x7add('187','Las&')](e);}else{_0x347f0e['zCzaY'](_0x59863c,_0x1f89aa);}}});});}function getToken(){var _0x32cd1d={'SGqFG':function(_0x31e1b2,_0x2c9454){return _0x31e1b2(_0x2c9454);},'hlfOk':function(_0x1e5d44,_0x5412f9){return _0x1e5d44!==_0x5412f9;},'kCuxm':'ULzuz','SKJda':_0x7add('188','67H%'),'sIBth':_0x7add('189','rhd^'),'rvSOG':function(_0x110bcd,_0x4eef94){return _0x110bcd(_0x4eef94);},'uJwAZ':function(_0x262707,_0x46135b){return _0x262707!==_0x46135b;},'KelzB':'MuREe','zumBt':_0x7add('18a','bBDe'),'ohMZp':_0x7add('18b','ylOc'),'VVAhw':_0x7add('18c','Poa0'),'HegLX':_0x7add('18d','PrLI'),'pbhIB':_0x7add('18e','KdRK')};return new Promise(_0x2a1640=>{if(_0x32cd1d[_0x7add('18f','ylOc')](_0x32cd1d[_0x7add('190','bBDe')],_0x32cd1d[_0x7add('191','Las&')])){_0x32cd1d[_0x7add('192','D1At')](_0x2a1640,res);}else{let _0x241800={'url':'https://jdjoy.jd.com/saas/framework/user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com','headers':{'Host':_0x32cd1d['zumBt'],'Origin':_0x32cd1d[_0x7add('193','0WUC')],'Cookie':cookie,'Connection':_0x32cd1d[_0x7add('194','8mra')],'Accept':_0x7add('195','Y5hL'),'User-Agent':_0x32cd1d[_0x7add('196','*cN[')],'Accept-Language':_0x7add('197','Las&'),'Referer':_0x32cd1d[_0x7add('198','$Jz]')]}};$[_0x7add('199','0WUC')](_0x241800,(_0x2492ee,_0x4f877c,_0x4cc7f1)=>{try{if(_0x4cc7f1){let _0x3bb497=$[_0x7add('19a','E#$c')](_0x4cc7f1);if(_0x3bb497){if(_0x32cd1d[_0x7add('19b','K5y)')](_0x7add('19c','Sc)*'),_0x32cd1d[_0x7add('19d','v8Z*')])){$['token']=_0x3bb497[_0x7add('19e','rv$z')];}else{console[_0x7add('19f','1Pjk')](_0x4cc7f1);if(_0x4cc7f1){let _0x20b4e6=$[_0x7add('1a0','Sc)*')](_0x4cc7f1);if(_0x20b4e6){$[_0x7add('1a1','67H%')]=_0x20b4e6[_0x7add('b5','y8DD')];}}}}}}catch(_0x431afc){if(_0x32cd1d[_0x7add('1a2','bBDe')]!==_0x32cd1d['SKJda']){console[_0x7add('1a3','5Pci')](_0x431afc);console[_0x7add('1a4','D1At')]('京东服务器访问数据为空，请检查自身设备网络情况');return![];}else{console[_0x7add('163','%66I')](_0x431afc);}}finally{if(_0x32cd1d[_0x7add('1a5','8rz(')](_0x32cd1d['sIBth'],_0x32cd1d['sIBth'])){console[_0x7add('bc','tWp(')]($[_0x7add('1a6','VGSA')](data));}else{_0x32cd1d[_0x7add('1a7','nb32')](_0x2a1640,_0x4cc7f1);}}});}});}function safeGet(_0x4b60d2){var _0x442bc0={'haGNm':function(_0x561924,_0x48c35f){return _0x561924===_0x48c35f;},'EUPiz':function(_0x3ba823,_0x5e621c){return _0x3ba823==_0x5e621c;},'kCLxk':_0x7add('1a8','11HB')};try{if(_0x442bc0['haGNm'](_0x7add('1a9','5dFK'),_0x7add('1aa','kV#2'))){console[_0x7add('1ab','hjEY')](res);if(res){let _0x59f068=$[_0x7add('1ac','y8DD')](res);if(_0x59f068[_0x7add('7f','8rz(')]){$[_0x7add('1ad','1Pjk')]=_0x59f068[_0x7add('1ae','%66I')];}}}else{if(_0x442bc0['EUPiz'](typeof JSON[_0x7add('1af','urD%')](_0x4b60d2),_0x442bc0['kCLxk'])){return!![];}}}catch(_0x43cf04){console[_0x7add('1a3','5Pci')](_0x43cf04);console[_0x7add('1b0','VGSA')](_0x7add('1b1','J6vJ'));return![];}}function jsonParse(_0x2accab){var _0x2773f5={'SzDOj':function(_0x2aab2e,_0xe342f2){return _0x2aab2e!==_0xe342f2;},'MKxQv':_0x7add('1b2','tWp('),'YvJSu':function(_0x43d866,_0x539cab){return _0x43d866!==_0x539cab;},'PNzLb':'GzFIW','PGuJu':_0x7add('1b3','Y5hL')};if(typeof _0x2accab==_0x7add('1b4','y8DD')){if(_0x2773f5[_0x7add('1b5','X)T%')](_0x2773f5[_0x7add('1b6','bBDe')],_0x2773f5[_0x7add('1b7','ra0E')])){console[_0x7add('182','DmNL')](e);}else{try{return JSON[_0x7add('1b8','J6vJ')](_0x2accab);}catch(_0xc61a0b){if(_0x2773f5[_0x7add('1b9','nb32')](_0x2773f5[_0x7add('1ba','Y5hL')],_0x2773f5[_0x7add('1bb','Poa0')])){console[_0x7add('50','J6vJ')](_0xc61a0b);$[_0x7add('1bc','urD%')]($[_0x7add('1bd','&%5&')],'',_0x7add('1be','ylOc'));return[];}else{$['token']=data[_0x7add('184','BMrn')];}}}}};_0xodi='jsjiami.com.v6';

function Env(t, e) {
  class s {
      constructor(t) {
          this.env = t
      }
      send(t, e = "GET") {
          t = "string" == typeof t ? {
              url: t
          } : t;
          let s = this.get;
          return "POST" === e && (s = this.post), new Promise((e, i) => {
              s.call(this, t, (t, s, r) => {
                  t ? i(t) : e(s)
              })
          })
      }
      get(t) {
          return this.send.call(this.env, t)
      }
      post(t) {
          return this.send.call(this.env, t, "POST")
      }
  }
  return new class {
      constructor(t, e) {
          this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
      }
      isNode() {
          return "undefined" != typeof module && !!module.exports
      }
      isQuanX() {
          return "undefined" != typeof $task
      }
      isSurge() {
          return "undefined" != typeof $httpClient && "undefined" == typeof $loon
      }
      isLoon() {
          return "undefined" != typeof $loon
      }
      toObj(t, e = null) {
          try {
              return JSON.parse(t)
          } catch {
              return e
          }
      }
      toStr(t, e = null) {
          try {
              return JSON.stringify(t)
          } catch {
              return e
          }
      }
      getjson(t, e) {
          let s = e;
          const i = this.getdata(t);
          if (i) try {
              s = JSON.parse(this.getdata(t))
          } catch {}
          return s
      }
      setjson(t, e) {
          try {
              return this.setdata(JSON.stringify(t), e)
          } catch {
              return !1
          }
      }
      getScript(t) {
          return new Promise(e => {
              this.get({
                  url: t
              }, (t, s, i) => e(i))
          })
      }
      runScript(t, e) {
          return new Promise(s => {
              let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
              i = i ? i.replace(/\n/g, "").trim() : i;
              let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
              r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
              const [o, h] = i.split("@"), a = {
                  url: `http://${h}/v1/scripting/evaluate`,
                  body: {
                      script_text: t,
                      mock_type: "cron",
                      timeout: r
                  },
                  headers: {
                      "X-Key": o,
                      Accept: "*/*"
                  }
              };
              this.post(a, (t, e, i) => s(i))
          }).catch(t => this.logErr(t))
      }
      loaddata() {
          if (!this.isNode()) return {}; {
              this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
              const t = this.path.resolve(this.dataFile),
                  e = this.path.resolve(process.cwd(), this.dataFile),
                  s = this.fs.existsSync(t),
                  i = !s && this.fs.existsSync(e);
              if (!s && !i) return {}; {
                  const i = s ? t : e;
                  try {
                      return JSON.parse(this.fs.readFileSync(i))
                  } catch (t) {
                      return {}
                  }
              }
          }
      }
      writedata() {
          if (this.isNode()) {
              this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
              const t = this.path.resolve(this.dataFile),
                  e = this.path.resolve(process.cwd(), this.dataFile),
                  s = this.fs.existsSync(t),
                  i = !s && this.fs.existsSync(e),
                  r = JSON.stringify(this.data);
              s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
          }
      }
      lodash_get(t, e, s) {
          const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
          let r = t;
          for (const t of i)
              if (r = Object(r)[t], void 0 === r) return s;
          return r
      }
      lodash_set(t, e, s) {
          return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
      }
      getdata(t) {
          let e = this.getval(t);
          if (/^@/.test(t)) {
              const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
              if (r) try {
                  const t = JSON.parse(r);
                  e = t ? this.lodash_get(t, i, "") : e
              } catch (t) {
                  e = ""
              }
          }
          return e
      }
      setdata(t, e) {
          let s = !1;
          if (/^@/.test(e)) {
              const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
              try {
                  const e = JSON.parse(h);
                  this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
              } catch (e) {
                  const o = {};
                  this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
              }
          } else s = this.setval(t, e);
          return s
      }
      getval(t) {
          return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
      }
      setval(t, e) {
          return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
      }
      initGotEnv(t) {
          this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
      }
      get(t, e = (() => {})) {
          t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
              "X-Surge-Skip-Scripting": !1
          })), $httpClient.get(t, (t, s, i) => {
              !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
          })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
              hints: !1
          })), $task.fetch(t).then(t => {
              const {
                  statusCode: s,
                  statusCode: i,
                  headers: r,
                  body: o
              } = t;
              e(null, {
                  status: s,
                  statusCode: i,
                  headers: r,
                  body: o
              }, o)
          }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
              try {
                  if (t.headers["set-cookie"]) {
                      const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                      this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                  }
              } catch (t) {
                  this.logErr(t)
              }
          }).then(t => {
              const {
                  statusCode: s,
                  statusCode: i,
                  headers: r,
                  body: o
              } = t;
              e(null, {
                  status: s,
                  statusCode: i,
                  headers: r,
                  body: o
              }, o)
          }, t => {
              const {
                  message: s,
                  response: i
              } = t;
              e(s, i, i && i.body)
          }))
      }
      post(t, e = (() => {})) {
          if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
              "X-Surge-Skip-Scripting": !1
          })), $httpClient.post(t, (t, s, i) => {
              !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
          });
          else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
              hints: !1
          })), $task.fetch(t).then(t => {
              const {
                  statusCode: s,
                  statusCode: i,
                  headers: r,
                  body: o
              } = t;
              e(null, {
                  status: s,
                  statusCode: i,
                  headers: r,
                  body: o
              }, o)
          }, t => e(t));
          else if (this.isNode()) {
              this.initGotEnv(t);
              const {
                  url: s,
                  ...i
              } = t;
              this.got.post(s, i).then(t => {
                  const {
                      statusCode: s,
                      statusCode: i,
                      headers: r,
                      body: o
                  } = t;
                  e(null, {
                      status: s,
                      statusCode: i,
                      headers: r,
                      body: o
                  }, o)
              }, t => {
                  const {
                      message: s,
                      response: i
                  } = t;
                  e(s, i, i && i.body)
              })
          }
      }
      time(t) {
          let e = {
              "M+": (new Date).getMonth() + 1,
              "d+": (new Date).getDate(),
              "H+": (new Date).getHours(),
              "m+": (new Date).getMinutes(),
              "s+": (new Date).getSeconds(),
              "q+": Math.floor(((new Date).getMonth() + 3) / 3),
              S: (new Date).getMilliseconds()
          };
          /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
          for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
          return t
      }
      msg(e = t, s = "", i = "", r) {
          const o = t => {
              if (!t) return t;
              if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                  "open-url": t
              } : this.isSurge() ? {
                  url: t
              } : void 0;
              if ("object" == typeof t) {
                  if (this.isLoon()) {
                      let e = t.openUrl || t.url || t["open-url"],
                          s = t.mediaUrl || t["media-url"];
                      return {
                          openUrl: e,
                          mediaUrl: s
                      }
                  }
                  if (this.isQuanX()) {
                      let e = t["open-url"] || t.url || t.openUrl,
                          s = t["media-url"] || t.mediaUrl;
                      return {
                          "open-url": e,
                          "media-url": s
                      }
                  }
                  if (this.isSurge()) {
                      let e = t.url || t.openUrl || t["open-url"];
                      return {
                          url: e
                      }
                  }
              }
          };
          this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
          let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
          h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
      }
      log(...t) {
          t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
      }
      logErr(t, e) {
          const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
          s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
      }
      wait(t) {
          return new Promise(e => setTimeout(e, t))
      }
      done(t = {}) {
          const e = (new Date).getTime(),
              s = (e - this.startTime) / 1e3;
          this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
      }
  }(t, e)
}