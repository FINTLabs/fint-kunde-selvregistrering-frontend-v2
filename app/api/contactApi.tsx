// const api = process.env.APIURL;

const api = "http://localhost:8080";

export interface IContact {
  nin: string;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: string;
}

export default class ContactApi {
  static async createContact(
    contact: IContact,
    onAlreadyExists?: () => any, // Modify to return directly
    onCreated?: () => any // Modify to return directly
  ) {
    const check = await this.checkIfExistingContact(contact.nin);

    if (!check) {
      const response = await fetch(`${api}/api/self/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Failed to create contact");
      }

      if (onCreated) return onCreated();
      return response.json(); // Default return if no callback
    } else {
      if (onAlreadyExists) return onAlreadyExists();
      throw new Error("Contact already exists");
    }
  }

  static async checkIfExistingContact(nin: string) {
    const response = await fetch(
      `${api}/api/self/register?nin=${encodeURIComponent(nin)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Check if existing: ", nin, response);
    return response.ok;
  }
}
