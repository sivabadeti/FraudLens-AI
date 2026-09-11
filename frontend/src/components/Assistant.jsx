import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Focus input when assistant opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Send message to Node backend
  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong"
        );
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Assistant error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm unable to connect right now. Please make sure the FraudLens services are running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter to send
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // Suggested question
  const askQuestion = (question) => {
    setInput(question);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <>
      {/* =====================================================
          FLOATING CHAT BUTTON
      ====================================================== */}

      <div
        className="
          fixed
          right-5
          bottom-5

          sm:right-7
          sm:bottom-7

          z-[9999]
        "
      >
        {/* Pulse */}

        {!isOpen && (
          <span
            className="
              absolute
              inset-0

              rounded-full

              bg-[#FF6500]

              opacity-20

              animate-ping
            "
          />
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={
            isOpen
              ? "Close FraudLens Assistant"
              : "Open FraudLens Assistant"
          }
          className={`
            relative

            w-14
            h-14

            sm:w-16
            sm:h-16

            rounded-full

            flex
            items-center
            justify-center

            text-white

            shadow-[0_10px_30px_rgba(20,33,61,0.25)]

            transition-all
            duration-300

            hover:-translate-y-1
            hover:scale-105

            ${
              isOpen
                ? "bg-[#14213D]"
                : "bg-[#FF6500]"
            }
          `}
        >
          {isOpen ? (
            /* Close icon */
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          ) : (
            /* Chat icon */
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="
                  M20 11.5
                  C20 16.194 16.194 20 11.5 20
                  C10.29 20 9.15 19.75 8.1 19.25
                  L4 21
                  L5.1 17.15
                  C4.4 15.85 4 14.4 4 12.5
                  C4 7.806 7.806 4 12.5 4
                  C17.194 4 20 7.806 20 11.5Z
                "
              />

              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
            </svg>
          )}
        </button>
      </div>


      {/* =====================================================
          CHAT WINDOW
      ====================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            z-[9998]

            /* Mobile */
            left-3
            right-3
            bottom-20

            /* Desktop */
            sm:left-auto
            sm:right-6
            sm:bottom-24

            /* Width */
            w-auto
            sm:w-[380px]
            md:w-[400px]

            max-w-[calc(100vw-24px)]

            /* Height */
            h-[calc(100vh-110px)]

            min-h-[480px]
            max-h-[560px]

            /* Layout */
            flex
            flex-col

            overflow-hidden

            /* UI */
            bg-white

            rounded-[22px]

            border
            border-[#E6EAF0]

            shadow-[0_25px_80px_rgba(20,33,61,0.20)]
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative

              shrink-0

              px-5
              py-4

              bg-gradient-to-br
              from-[#14213D]
              to-[#1B3158]

              text-white
            "
          >
            {/* Decorative circle */}

            <div
              className="
                absolute

                -right-8
                -top-10

                w-32
                h-32

                rounded-full

                bg-white/5
              "
            />

            <div
              className="
                relative

                flex
                items-center
                justify-between
              "
            >

              {/* Assistant identity */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                {/* Chat avatar */}

                <div
                  className="
                    w-11
                    h-11

                    shrink-0

                    rounded-2xl

                    bg-white/10

                    border
                    border-white/15

                    flex
                    items-center
                    justify-center

                    text-[#FF8A3D]
                  "
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="
                        M20 11.5
                        C20 16.194 16.194 20 11.5 20
                        C10.29 20 9.15 19.75 8.1 19.25
                        L4 21
                        L5.1 17.15
                        C4.4 15.85 4 14.4 4 12.5
                        C4 7.806 7.806 4 12.5 4
                        C17.194 4 20 7.806 20 11.5Z
                      "
                    />

                    <path d="M8 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M16 12h.01" />
                  </svg>
                </div>

                <div>
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                    "
                  >
                    FraudLens Assistant
                  </h3>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5

                      mt-1

                      text-[11px]

                      text-white/65
                    "
                  >
                    <span
                      className="
                        w-1.5
                        h-1.5

                        rounded-full

                        bg-[#35D07F]

                        shadow-[0_0_8px_rgba(53,208,127,0.8)]
                      "
                    />

                    AI fraud-safety assistant
                  </div>
                </div>
              </div>


              {/* Close */}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  w-8
                  h-8

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  text-white/60

                  hover:text-white
                  hover:bg-white/10

                  transition-colors
                "
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>

            </div>
          </div>


          {/* =================================================
              CHAT BODY
          ================================================= */}

          <div
            className="
              flex-1

              overflow-y-auto

              px-4
              py-5

              bg-[#F8FAFC]
            "
          >

            {/* =================================================
                WELCOME SCREEN
            ================================================= */}

            {messages.length === 0 && (
              <div className="flex flex-col min-h-full">

                <div
                  className="
                    flex-1

                    flex
                    flex-col
                    justify-center
                  "
                >

                  {/* Large chat icon */}

                  <div
                    className="
                      flex
                      justify-center

                      mb-5
                    "
                  >
                    <div
                      className="
                        w-16
                        h-16

                        rounded-2xl

                        bg-gradient-to-br
                        from-[#FFF1E8]
                        to-[#FFF8F3]

                        border
                        border-[#FFE1CF]

                        flex
                        items-center
                        justify-center

                        text-[#FF6500]

                        shadow-sm
                      "
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path
                          d="
                            M20 11.5
                            C20 16.194 16.194 20 11.5 20
                            C10.29 20 9.15 19.75 8.1 19.25
                            L4 21
                            L5.1 17.15
                            C4.4 15.85 4 14.4 4 12.5
                            C4 7.806 7.806 4 12.5 4
                            C17.194 4 20 7.806 20 11.5Z
                          "
                        />

                        <path d="M8 12h.01" />
                        <path d="M12 12h.01" />
                        <path d="M16 12h.01" />
                      </svg>
                    </div>
                  </div>


                  <h2
                    className="
                      text-center

                      text-lg

                      font-bold

                      text-[#14213D]
                    "
                  >
                    How can I help you?
                  </h2>


                  <p
                    className="
                      mt-2

                      px-4

                      text-center

                      text-xs

                      leading-relaxed

                      text-[#718096]
                    "
                  >
                    Get practical guidance about scams,
                    payments, UPI, phishing and online
                    financial safety.
                  </p>


                  {/* =================================================
                      SUGGESTIONS
                  ================================================= */}

                  <div
                    className="
                      mt-6

                      space-y-2
                    "
                  >

                    {[
                      "Is it safe to share my UPI PIN?",
                      "I received a suspicious payment link",
                      "What should I do after a scam?",
                    ].map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => askQuestion(question)}
                        className="
                          w-full

                          px-4
                          py-3

                          rounded-xl

                          bg-white

                          border
                          border-[#E7EBF1]

                          text-left

                          text-xs

                          text-[#34445E]

                          flex
                          items-center
                          justify-between

                          transition-all

                          hover:border-[#FFB98F]
                          hover:bg-[#FFF9F5]
                          hover:text-[#14213D]

                          group
                        "
                      >
                        <span>
                          {question}
                        </span>

                        <svg
                          className="
                            w-4
                            h-4

                            shrink-0

                            text-[#A7B0BE]

                            group-hover:text-[#FF6500]

                            transition-colors
                          "
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    ))}

                  </div>


                  {/* Safety note */}

                  <div
                    className="
                      mt-5

                      px-3
                      py-2.5

                      rounded-xl

                      bg-[#F0FBF5]

                      border
                      border-[#D8F3E4]

                      text-[10px]

                      leading-relaxed

                      text-[#397254]
                    "
                  >
                    <span className="font-semibold">
                      Safety first:
                    </span>{" "}
                    Never share your OTP, UPI PIN,
                    password or CVV with anyone.
                  </div>

                </div>
              </div>
            )}


            {/* =================================================
                MESSAGES
            ================================================= */}

            {messages.length > 0 && (
              <div className="space-y-4">

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`
                      flex

                      ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >

                    {/* Assistant avatar */}

                    {message.role === "assistant" && (
                      <div
                        className="
                          shrink-0

                          w-7
                          h-7

                          mr-2
                          mt-1

                          rounded-lg

                          bg-[#FFF1E8]

                          text-[#FF6500]

                          flex
                          items-center
                          justify-center
                        "
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            d="
                              M20 11.5
                              C20 16.194 16.194 20 11.5 20
                              C10.29 20 9.15 19.75 8.1 19.25
                              L4 21
                              L5.1 17.15
                              C4.4 15.85 4 14.4 4 12.5
                              C4 7.806 7.806 4 12.5 4
                              C17.194 4 20 7.806 20 11.5Z
                            "
                          />

                          <path d="M8 12h.01" />
                          <path d="M12 12h.01" />
                          <path d="M16 12h.01" />
                        </svg>
                      </div>
                    )}


                    {/* Message bubble */}                    <div
                      className={`
                        max-w-[82%]
                        px-3.5
                        py-3
                        rounded-2xl
                        text-xs
                        sm:text-[13px]
                        leading-6
                        ${
                          message.role === "user"
                            ? `
                              bg-[#FF6500]
                              text-white
                              rounded-tr-md
                              shadow-sm
                            `
                            : `
                              bg-white
                              text-[#34445E]
                              border border-[#E7EBF1]
                              rounded-tl-md
                              shadow-sm
                            `
                        }
                      `}
                    >
                      {message.role === "user" ? (
                        <p className="m-0 whitespace-pre-wrap">
                          {message.content}
                        </p>
                      ) : (
                        <div className="w-full">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="m-0 mb-3 last:mb-0 leading-6">
                                  {children}
                                </p>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-semibold text-[#14213D]">
                                  {children}
                                </strong>
                              ),

                              ul: ({ children }) => (
                                <ul className="m-0 mb-3 list-none space-y-2">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="m-0 mb-3 list-decimal space-y-2 pl-5">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="relative pl-5 leading-6">
                                  <span className="absolute left-0 top-[0.65rem] h-1.5 w-1.5 rounded-full bg-[#FF6500]" />
                                  <span>{children}</span>
                                </li>
                              ),

                              h1: ({ children }) => (
                                <h1 className="m-0 mb-2 text-base font-bold text-[#14213D]">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="m-0 mb-2 text-sm font-bold text-[#14213D]">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="m-0 mb-2 text-[13px] font-semibold text-[#14213D]">
                                  {children}
                                </h3>
                              ),

                              blockquote: ({ children }) => (
                                <blockquote className="m-0 mb-3 border-l-2 border-[#FF6500] bg-[#FFF8F3] px-3 py-2 text-[#4B5A70]">
                                  {children}
                                </blockquote>
                              ),

                              hr: () => (
                                <hr className="my-3 border-0 border-t border-[#E7EBF1]" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>

                  </div>
                ))}


                {/* =================================================
                    TYPING INDICATOR
                ================================================= */}

                {loading && (
                  <div className="flex items-start">

                    <div
                      className="
                        shrink-0

                        w-7
                        h-7

                        mr-2

                        rounded-lg

                        bg-[#FFF1E8]

                        text-[#FF6500]

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M8 12h.01" />
                        <path d="M12 12h.01" />
                        <path d="M16 12h.01" />
                      </svg>
                    </div>

                    <div
                      className="
                        px-4
                        py-3

                        rounded-2xl
                        rounded-tl-md

                        bg-white

                        border
                        border-[#E7EBF1]

                        flex
                        items-center
                        gap-1
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9AA5B5] animate-bounce" />

                      <span className="w-1.5 h-1.5 rounded-full bg-[#9AA5B5] animate-bounce [animation-delay:150ms]" />

                      <span className="w-1.5 h-1.5 rounded-full bg-[#9AA5B5] animate-bounce [animation-delay:300ms]" />
                    </div>

                  </div>
                )}

                <div ref={messagesEndRef} />

              </div>
            )}

          </div>


          {/* =================================================
              INPUT
          ================================================= */}

          <div
            className="
              shrink-0

              p-3

              bg-white

              border-t
              border-[#EDF0F5]
            "
          >

            <div
              className="
                flex
                items-end
                gap-2

                p-1.5

                rounded-2xl

                bg-[#F7F9FC]

                border
                border-[#E1E6EE]

                focus-within:border-[#FFB98F]

                focus-within:ring-2
                focus-within:ring-[#FF6500]/10
              "
            >

              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask about fraud safety..."
                rows={1}
                disabled={loading}
                className="
                  flex-1

                  min-h-[38px]
                  max-h-[80px]

                  resize-none

                  px-2.5
                  py-2

                  bg-transparent

                  outline-none

                  text-[13px]

                  text-[#14213D]

                  placeholder:text-[#9AA5B5]

                  disabled:opacity-50
                "
              />


              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="
                  shrink-0

                  w-10
                  h-10

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  bg-[#FF6500]

                  text-white

                  shadow-sm

                  transition-all

                  hover:bg-[#E95700]
                  hover:scale-105

                  disabled:opacity-30
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>

            </div>


            <p
              className="
                mt-1.5

                text-center

                text-[9px]

                text-[#A1AAB8]
              "
            >
              FraudLens AI can make mistakes. Verify critical
              financial information.
            </p>

          </div>

        </div>
      )}
    </>
  );
}

export default Assistant;