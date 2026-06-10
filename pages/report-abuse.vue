<template>
    <landing-nav/>
  <div class="bg-gray-50 min-h-screen text-gray-800">
    <div class="max-w-4xl mx-auto px-6 py-24">
      <h1 class="text-3xl font-bold text-center text-red-700 mb-8">Report Abuse or Misconduct</h1>

      <!-- Intro -->
      <p class="mb-6 text-center text-sm sm:text-base">
        At Hema, your safety and dignity come first. If you or someone you know has experienced abuse, exploitation, or misconduct, please report it immediately. We are here to help.
      </p>

      <!-- What Can Be Reported -->
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-3 text-red-600">What Can Be Reported</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>Fraudulent job offers</li>
          <li>Physical, emotional, or sexual abuse</li>
          <li>Non-payment or underpayment of wages</li>
          <li>Passport withholding or forced labor</li>
          <li>Unsafe working or living conditions</li>
          <li>Misconduct by recruitment agencies, employers, or Hema representatives</li>
        </ul>
      </section>

      <!-- How to Report -->
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-3 text-red-600">How to Report</h2>
        <ol class="list-decimal list-inside space-y-3">
          <li><strong>Online Form:</strong> Complete the form below. You may remain anonymous.</li>
          <li><strong>WhatsApp Hotline:</strong> +254 7XX XXX XXX</li>
          <li><strong>Email:</strong> <a href="mailto:report@hema.org" class="text-blue-600 underline">report@hema.org</a></li>
          <li><strong>Call Helpline:</strong> Toll-Free: 0800-XXX-XXX (Mon–Fri, 8:00 AM – 6:00 PM EAT)</li>
        </ol>
      </section>

      <!-- Report Form -->
      <section class="mb-10 bg-white shadow rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4 text-red-600">Submit a Report</h3>
        <form @submit.prevent="submitReport" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="Your Name (Optional)" class="w-full border rounded-xl px-4 py-2" />
          <input v-model="form.email" type="email" placeholder="Your Email (Optional)" class="w-full border rounded-xl px-4 py-2" />
          <textarea v-model="form.message" required rows="5" placeholder="Describe the issue..." class="w-full border rounded-xl px-4 py-2"></textarea>
          <button type="submit" class="bg-red-600 text-white font-medium px-6 py-2 rounded-xl hover:bg-red-700">Send Report</button>
        </form>
        <p v-if="submitted" class="text-green-600 mt-4">Thank you. Your report has been received.</p>
      </section>

      <!-- Confidentiality Promise -->
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-3 text-red-600">Your Report Is Safe With Us</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>All reports are handled with strict confidentiality</li>
          <li>We do not disclose your identity without your consent</li>
          <li>Every case is reviewed within 48 hours</li>
        </ul>
      </section>

      <!-- What Happens Next -->
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3 text-red-600">What Happens Next?</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>You will receive an acknowledgment (if contact is shared)</li>
          <li>Our team will investigate the issue</li>
          <li>Appropriate actions will be taken in coordination with authorities and representatives</li>
        </ul>
      </section>

      <!-- Emergency Notice -->
      <div class="bg-red-50 border-l-4 border-red-400 p-4 text-sm">
        <strong>If you are in immediate danger:</strong> head to our safe house (location TBD) or contact local authorities and reach us as soon as you can.
        <div class="mt-2 text-red-700 font-medium">Hema is your shield.</div>
      </div>
    </div>
  </div>
  <landing-footer />
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const submitReport = () => {
  // Simulate API call
  console.log('Report submitted:', form.value)
  submitted.value = true
  form.value = { name: '', email: '', message: '' }
}
</script>
