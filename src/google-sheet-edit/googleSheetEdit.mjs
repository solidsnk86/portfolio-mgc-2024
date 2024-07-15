const csv = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJrdhTMKu6Fb1V-c9dTwUOOoPBcts0LCN1JU9CnJL9WnnSbMQuPNKOcRTOaFBVQo4s6bBfN0skaS6Y/pub?output=csv",
};

export const updatePhotoProfile = async () => {
  const res = await fetch(csv.url, { mode: "cors" });
  const data = await res.text();
  const retrievedData = data
    .split("\n")
    .slice(1)
    .map((row) => {
      const [profilePhoto, profileCoverPhoto] = row.split(",");
      return { profilePhoto, profileCoverPhoto };
    });
  return retrievedData;
};
