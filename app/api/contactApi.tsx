// const api = process.env.APIURL;

import { json } from "@remix-run/react";

const api = "http://localhost:8080";

export interface IContact {
  nin: string;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: string;
}

type ContactApiResponse = {
  errorMessage?: string;
  alreadyExists?: boolean;
  created?: boolean;
};

export default class ContactApi {
  static async createContact(
    contact: IContact,
    userXnin: string
  ): Promise<ContactApiResponse> {
    const checkExistance = await this.checkIfExistingContact(
      contact.nin,
      userXnin
    );

    if (!checkExistance) {
      const response = await fetch(`${api}/api/self/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nin": `${userXnin}`,
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        return { errorMessage: "something went wrong" };
      }

      return { created: true };
    } else {
      return { alreadyExists: true };
    }
  }

  static async checkIfExistingContact(formNin: string, userXnin: string) {
    try {
      const response = await fetch(
        `${api}/api/self/register?nin=${encodeURIComponent(formNin)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-nin": `${userXnin}`,
          },
        }
      );

      console.log(response);
      if (!response.ok) {
        const errorDetails = await response.json();

        console.log("checkIfExistingContact, Error details:", errorDetails);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Network or other error:", error);
      return false;
    }
  }
}
