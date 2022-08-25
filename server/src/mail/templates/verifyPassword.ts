const verifyPassword = (verifyPasswordLink: string, userName: string): string => `
<div>
Hello ${userName}
<br/>
<br/>
Your Mart account has been created, kindly verify that this is your email address by clicking the link below.
<br/>
 ${verifyPasswordLink}
<br/>
<br/>
Kind Regards,
<br/> 
Yaseer Okino
</div>`;

export default verifyPassword;
