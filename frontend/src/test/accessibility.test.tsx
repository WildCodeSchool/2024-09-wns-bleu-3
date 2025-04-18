import { render } from "@testing-library/react";
import LoginPage from "@/pages/LoginPage";
import { expect, test } from "vitest";
import { axe } from "vitest-axe"
import "vitest-axe/extend-expect";
import { MemoryRouter } from "react-router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import SignupPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";


// Apollo client mock
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

// Mock ResizeObserver (error related to ui libraries)
global.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

test("should have no accessibility violations for login page", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </ApolloProvider>
  )

  const results = await axe(container)

  if (results.violations.length > 0) {
    console.log("Accessibility violations found in login page:");
    console.log(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      }))
    )
  }

  expect(results.violations.length).toBe(0)
})





test("should have no accessibility violations for signup page", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    </ApolloProvider>
  )

  const results = await axe(container)

  if (results.violations.length > 0) {
    console.log("Accessibility violations found in signup Page:");
    console.log(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      }))
    )
  }

  expect(results.violations.length).toBe(0)
})


test("should have no accessibility violations for Home page", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </ApolloProvider>
  )

  const results = await axe(container)

  if (results.violations.length > 0) {
    console.log("Accessibility violations found in HomePage:");
    console.log(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      }))
    )
  }

  expect(results.violations.length).toBe(0)
})


test("should have no accessibility violations for profile page", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    </ApolloProvider>
  )

  const results = await axe(container)

  if (results.violations.length > 0) {
    console.log("Accessibility violations found in ProfilePage:");
    console.log(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      }))
    )
  }

  expect(results.violations.length).toBe(0)
})

test("should have no accessibility violations for resetpassword page", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </ApolloProvider>
  )

  const results = await axe(container)

  if (results.violations.length > 0) {
    console.log("Accessibility violations found in resetPasswordPage:");
    console.log(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      }))
    )
  }

  expect(results.violations.length).toBe(0)
})

