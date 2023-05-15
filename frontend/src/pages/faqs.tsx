import React from "react";

export function Faqs() {
  return (
    <section className="bg-purple-300 rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900">
          Frequently asked questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How can I use Chatingar?
              </h3>
              <p className="text-gray-900">
                To get started on Chatingar, visit our homepage and fill in the
                required information on the form. Once completed, click on the
                "Start Chat" button.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How safe is Chatingar?
              </h3>
              <p className="text-gray-900">
                At Chatingar, we prioritise your safety and have taken measures
                to ensure a secure environment. We strongly recommend visiting
                our safety tips page for guidelines and precautions.
                Additionally, our dedicated Development Team and Administration
                continuously work to block countries and IPs with a negative
                reputation to enhance safety.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How can I contact back office support if I have a problem?
              </h3>
              <p className="text-gray-900">
                If you encounter any issues or have any concerns, our
                back-office support team is here to assist you. Please visit our
                contact page to reach out to us. We are committed to resolving
                your problems and providing assistance. Here is the direct link
                to our contact page: Contact Us.
              </p>
              <p className="text-gray-900">
                Feel free to{" "}
                <a
                  href="/contact"
                  className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact us
                </a>{" "}
                and we'll help you out as soon as we can.
              </p>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How do I send a message to an online user?
              </h3>
              <p className="text-gray-900">
                After logging in to Chatingar, you will see the list of all
                online users on the left side of the screen. Simply select the
                user you want to chat with by clicking on their name. This will
                open a chat box where you can type your message. Once ready,
                click the "Send" button to send the message.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                What kind of individuals can I expect to find on Chatingar?
              </h3>
              <p className="text-gray-900">
                Chatingar is a platform where you can connect with men and women
                from around the world. Our community consists of individuals who
                are looking to build relationships, meet new people, or find a
                special someone. If you have any further questions or require
                additional assistance, please feel free to contact us. We are
                here to ensure you have a pleasant experience on Chatingar.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How can I find girls on Chatingar?
              </h3>
              <p className="text-gray-900">
                We understand the importance of personal preferences, and that's
                why we are introducing a new feature that allows you to refine
                your search criteria. By clicking on the search button, you will
                be able to select the gender option, such as "female" or "male"
                and choose your preferred gender and the type of connection you
                are looking for. This feature will enable you to find and
                connect with individuals who align with your interests and
                preferences. Stay tuned for this exciting addition to Chatingar!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
