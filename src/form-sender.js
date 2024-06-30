import { supabase } from "./supabase";

export default async function formSender(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    const { data, error } = await supabase
      .from("contact-form-new-portfolio")
      .upsert([{ name, email, subject, message }]);

    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to den data", details: error.message });
    }

    return res
      .status(200)
      .json({ success: true, read: "Data send succefully", data });
  } else {
    return res.status(400).json({ error: "Method not allowed" });
  }
}
