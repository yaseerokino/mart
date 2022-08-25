const resetPassword = (resetPasswordLink: string, userName: string): string => `
<div>
Hello ${userName}
<br/>
<br/>
A request has been received to reset the password for your Mart account. Kindly click the link below to proceed.
<br/>
 ${resetPasswordLink}
<br/>
<br/>
Kind Regards,
<br/> 
Yaseer Okino
</div>`;

export default resetPassword;
