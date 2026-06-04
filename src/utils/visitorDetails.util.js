class VisitorQualificationService {
  extract(message) {
    const email =
      message.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
      )?.[0];

    const phone =
      message.match(/\b\d{10}\b/)?.[0];

    if (!email || !phone) {
      return null;
    }

    const name = message
      .replace(email, "")
      .replace(phone, "")
      .replace(/,/g, "")
      .trim();

    return {
      visitorName: name,
      visitorEmail: email,
      visitorPhone: phone,
    };
  }
}

export default new VisitorQualificationService();