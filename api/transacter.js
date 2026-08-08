// Remplacez votre fonction de notification actuelle par celle-ci
const sendPushoverNotification = async (message) => {
  const response = await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: "a68ythu2stdmjesyisxh43aw28hns3", // Votre nouveau token inséré
      user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
      message: message,
      title: "Nouvelle transaction MaKbine",
      url: "https://ma-kbine.vercel.app/", // URL de votre site ajoutée
      url_title: "Voir la plateforme",      // Titre du lien dans la notification
      sound: "cashregister",
      priority: 1
    }),
  });
  
  return await response.json();
};
