import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="border-2 border-red-400 max-w-3xl mx-auto bg-gray-900 shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-5xl font-bold text-red-400 mb-1">HttPete Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Effective Date: January 13, 2025</p>
          
          <p className="mb-6 text-gray-400">
            Hey! We're HttPete ("we," "our," or "us"), and we're just like you - developers who care about privacy and doing things the right way. This Privacy Policy is here to explain how we handle your information when you join the waitlist for the HttPete beta program. We've got your back, and protecting your data is a top priority for us.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">0. What We Collect</h2>
            <p className="mb-1 text-gray-400">When you sign up for the waitlist, here's what we'll collect:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-400">
              <li><strong>Name</strong>: So we know what to call you.</li>
              <li><strong>Email Address</strong>: To send you updates, invites, and all the good stuff about HttPete.</li>
              <li><strong>IP Address</strong>: For security and to help us understand where our users are coming from.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">1. How We Use Your Info</h2>
            <p className="mb-1 text-gray-400">Here's what we do with the information we collect:</p>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Manage the beta program waitlist.</li>
              <li>Keep you in the loop with updates and invitations.</li>
              <li>Analyze and improve our website and beta program experience.</li>
              <li>Keep things secure and running smoothly.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">2. Sharing Your Info</h2>
            <p className="text-gray-400">
              We don't sell, rent, or trade your data. Ever. We do work with some trusted third-party services (like the ones listed above) to help us analyze and improve our platform. These services only use your data as we've instructed, and they're bound by confidentiality agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">3. How Long We Keep Your Data</h2>
            <p className="mb-1 text-gray-400">We'll keep your info as long as we need to:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-400">
              <li>Run the beta program.</li>
              <li>Follow the rules (like legal or regulatory requirements).</li>
              <li>Resolve any issues or disputes.</li>
            </ul>
            <p className="text-gray-400">When we don't need it anymore, we'll delete it.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">4. Your Rights</h2>
            <p className="mb-1 text-gray-400">
              No matter where you're from, we believe everyone deserves the same rights when it comes to their data. Here's what you can do:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-400">
              <li>Request a copy of your data.</li>
              <li>Ask us to delete your data.</li>
            </ul>
            <p className="text-gray-400">Just shoot us an email at <a href="mailto:support@httpete.dev" className="text-red-300 underline hover:underline">support@httpete.dev</a>, and we'll take care of it.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">5. Keeping Your Data Safe</h2>
            <p className="text-gray-400">
              We're developers too, so we get it—your data is important. We've put solid measures in place to protect it from unauthorized access, disclosure, or tampering. While no system is 100% foolproof, we do our best to keep things secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">6. Third-Party Services</h2>
            <p className="mb-1 text-gray-400">We use some tools to help us improve and analyze things. These include:</p>
            <ul className="list-disc pl-5 text-gray-400">
              <li><Link href="https://matomo.org/" className="text-red-300 underline hover:underline">Matomo</Link>:
                Privacy friendly Google Analytics alternative.
                We host an instance ourselves and use it to track user behavior and performance.
              </li>
              <li><Link href="https://vercel.com/legal/privacy-policy" className="text-red-300 underline hover:underline">Vercel Analytics</Link>: Gives us insights into performance and user behavior.</li>
              <li><Link href="https://vercel.com/legal/privacy-policy" className="text-red-300 underline hover:underline">Vercel Speed Insights</Link>: Checks out how fast our site loads.</li>
              <li><Link href="https://sentry.io/privacy/" className="text-red-300 underline hover:underline">Sentry</Link>: Tracks errors so we can fix bugs faster.</li>
              <li><Link href="https://mixpanel.com/legal/privacy-policy/" className="text-red-300 underline hover:underline">Mixpanel</Link>: Helps us see how people are using HttPete and where we can improve.</li>
            </ul>
            <p className="mt-4 text-gray-400">Check out their privacy policies to see how they handle your data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-400">
              We might update this policy now and then. Before any updates to this policy, we will always inform you at least 7 days in advance. When a new policy takes effect, we'll update the "Effective Date" at the top.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2">8. Talk to Us</h2>
            <p className="mb-1 text-gray-400">Got questions or concerns? Reach out! Here's how you can get in touch:</p>
            <p className="text-gray-400">
              HttPete<br />
              <strong>Email:</strong> <a href="mailto:support@httpete.dev" className="text-red-300 underline hover:underline">support@httpete.dev</a>
            </p>
          </section>

          <p className="mt-8 text-gray-500">
            Thanks for trusting us with your information. We're excited to have you on this journey with HttPete!
          </p>
        </div>
      </div>
    </div>
  )
}

