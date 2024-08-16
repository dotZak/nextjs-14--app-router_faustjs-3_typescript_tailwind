"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./action";

function SubmitButton() {
  const status = useFormStatus();
  return (
    <button disabled={status.pending}>
      {status.pending ? "Loading…" : "Login"}
    </button>
  );
}

export default function Page() {
  const [state, formAction] = useFormState(loginAction, {});

  return (
    <>
      <main>
        <h1>Login</h1>

        <form action={formAction}>
          <div id="loginFormMessage">
            {state.error && (
              <p dangerouslySetInnerHTML={{ __html: state.error }} />
            )}
          </div>
          <fieldset>
            <legend>Account Credentials</legend>
            <label htmlFor="username">
              Username or email address
              <span aria-hidden="true"> (required)</span>
            </label>
            <input
              id="username"
              name="usernameEmail"
              type="text"
              inputMode="email"
              autoComplete="username"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
              aria-required="true"
              aria-describedby="loginFormMessage"
            />
            <br />
            <label htmlFor="current-password">
              Password
              <span aria-hidden="true"> (required)</span>
            </label>
            <input
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
              aria-required="true"
              aria-describedby="loginFormMessage"
            />
            {/*
            [1] Use `aria-hidden=true` on `label > span` when using `input[aria-required=true]` to label 
                required `input`s to prevent screen readers from reading "required" twice.
                  - See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required

            [2] `label[htmlFor]` must match `input[id]`

            [3] `input[type=text]` is best-suited for combined username and email address fields.
                  - WordPress handles logic to determine which to use.
                  - The front end is about enabling the user.

            [4] `input[inputmode=email]` is used on `input[type=text]` to enhance mobile device usage.
                  - In short, most devices with a virtual keyboard will display an `@` sign
                  - See: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode

            [5] a. `input[autocomplete=username]` is for any account name, including email addresses.
                b. `input[autocomplete=current-password]` hint that this is the current password, not a password reset.
                  - See: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#detail_tokens

            [6] a. `input[required]` is for interactivity
                b. `input[aria-required=true]` is for accessibility, specifically screen readers.
                c. `input[aria-describedby]` is for accessibility. It tells the user where to find messages related to
                    this input or form. In this form all messages populate to the same UI element, so all inputs
                    should be have the same `aria-describedby` value.
            */}
          </fieldset>
          <SubmitButton />
        </form>
      </main>
    </>
  );
}
