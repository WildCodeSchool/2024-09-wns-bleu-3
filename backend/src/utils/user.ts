export function emailHtml(randomCode: string) {
  return (`
  <div style="background-color: #051525; padding: 20px; font-family: Arial, sans-serif; color: #ffffff; text-align: center;">
      
      <!-- Logo en texte -->
      <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 10px;">
        <span style="color: white;">s</span>
        <span style="color: #007bff;">0</span>
        <span style="color: white;">nar</span>
        <span style="display: inline-block; width: 10px; height: 10px; background-color: #007bff; border-radius: 50%;"></span>
      </h1>

      <h2 style="color: #ffffff;">Réinitialisation de votre mot de passe</h2>
      <p style="font-size: 16px;">Vous avez demandé à réinitialiser votre mot de passe.</p>
      <p style="font-size: 16px;">Veuillez cliquer sur le bouton ci-dessous pour le réinitialiser :</p>
      
      <a href="http://localhost:3030/reset-password?tab=reset&code=${randomCode}" 
         style="display: inline-block; padding: 12px 20px; font-size: 16px; 
                color: #ffffff; background-color: #007bff; text-decoration: none;
                border-radius: 8px; font-weight: bold; margin: 20px 0;">
         Réinitialiser mon mot de passe
      </a>

      <p style="font-size: 14px; color: red; text-decoration: underline; margin-top: 20px;">
        Attention, ce lien expirera dans 10 minutes.
      </p>

      <hr style="border: 1px solid #0e3359; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaaaaa;       margin-top: 20px;">
            Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.
        </p>

      
  </div>
    `)
}

// export function emailConfirmation(randomCode: string) {
//   return (`
// <div style="background-color: #051525; padding: 20px; font-family: Arial, sans-serif; color: #ffffff; text-align: center;">
  
//   <!-- Logo en texte -->
//   <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 10px;">
//     <span style="color: white;">s</span>
//     <span style="color: #007bff;">0</span>
//     <span style="color: white;">nar</span>
//     <span style="display: inline-block; width: 10px; height: 10px; background-color: #007bff; border-radius: 50%;"></span>
//   </h1>

//   <h2 style="color: #ffffff;">Email Verification</h2>
//   <p style="font-size: 16px;">You have requested to verify your email address.</p>
//   <p style="font-size: 16px;">Please click the button below to verify your email:</p>
  
//   <a href="http://localhost:7000/verify-email/${verificationToken}" 
//      style="display: inline-block; padding: 12px 20px; font-size: 16px; 
//             color: #ffffff; background-color: #007bff; text-decoration: none;
//             border-radius: 8px; font-weight: bold; margin: 20px 0;">
//      Verify My Email
//   </a>

//   <p style="font-size: 14px; color: red; text-decoration: underline; margin-top: 20px;">
//     Warning, this link will expire in 10 minutes.
//   </p>

//   <hr style="border: 1px solid #0e3359; margin: 20px 0;">
//     <p style="font-size: 12px; color: #aaaaaa; margin-top: 20px;">
//         If you did not request this, you can safely ignore this email.
//     </p>

// </div>
//   </div>
//   `)
// }
