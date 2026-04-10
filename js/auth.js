// ============================================================
// TORIAS GLAM HAVEN | AUTHENTICATION LOGIC
// ============================================================

const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v'; // Use the public key

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {

  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const googleBtn = document.getElementById('google-login');

  // Tab Switching logic
  loginTab?.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  });

  signupTab?.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  });

  // --- SIGN UP ---
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const fullName = document.getElementById('signup-name').value;
    const errorEl = document.getElementById('signup-error');

    const submitBtn = signupForm.querySelector('button');
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      errorEl.textContent = error.message;
      errorEl.style.display = 'block';
      submitBtn.textContent = 'Join Torias';
      submitBtn.disabled = false;
    } else {
      alert("Registration successful! Please check your email for the confirmation link.");
      window.location.href = 'index.html';
    }
  });

  // --- SIGN IN ---
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    const submitBtn = loginForm.querySelector('button');
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      errorEl.textContent = error.message;
      errorEl.style.display = 'block';
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    } else {
      window.location.href = 'account.html';
    }
  });

  // --- GOOGLE LOGIN ---
  googleBtn?.addEventListener('click', async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/account.html'
      }
    });
    if (error) alert("Google Login Error: " + error.message);
  });

});
