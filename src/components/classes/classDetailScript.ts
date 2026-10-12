import { initClassComments } from './classComments';

function initPricingToggle() {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');
    const monthlyPlans = document.querySelector('.monthly-plans') as HTMLElement | null;
    const yearlyPlans = document.querySelector('.yearly-plans') as HTMLElement | null;

    if (monthlyBtn && yearlyBtn && monthlyPlans && yearlyPlans) {
        monthlyPlans.style.display = 'grid';
        yearlyPlans.style.display = 'none';

        monthlyBtn.addEventListener('click', function() {
            monthlyPlans.style.display = 'grid';
            yearlyPlans.style.display = 'none';
            monthlyBtn.classList.add('bg-white', 'text-primary');
            monthlyBtn.classList.remove('bg-primary', 'text-white');
            yearlyBtn.classList.add('bg-primary', 'text-white');
            yearlyBtn.classList.remove('bg-white', 'text-primary');
        });

        yearlyBtn.addEventListener('click', function() {
            yearlyPlans.style.display = 'grid';
            monthlyPlans.style.display = 'none';
            yearlyBtn.classList.add('bg-white', 'text-primary');
            yearlyBtn.classList.remove('bg-primary', 'text-white');
            monthlyBtn.classList.add('bg-primary', 'text-white');
            monthlyBtn.classList.remove('bg-white', 'text-primary');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPricingToggle();
        initClassComments();
    });
} else {
    initPricingToggle();
    initClassComments();
}
