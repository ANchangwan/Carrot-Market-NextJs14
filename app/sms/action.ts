"use server";

export default async function sms(prevState: any, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData 
  }
  return null;
}
