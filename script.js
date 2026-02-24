
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-btn';


let Total = document.getElementById('Total');
let rejected = document.getElementById('rejected');
let interview = document.getElementById('interview');
let jobCountDisplay = document.getElementById('job-count-display');


const mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');


const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

// calculateCount for lengthcount

function calculateCount() {

    let totalAllCards = allCardSection.querySelectorAll('.card').length;
    rejected.innerText = rejectedList.length;
    interview.innerText = interviewList.length;

    Total.innerText = totalAllCards;
   

    if (jobCountDisplay) {
        if (currentStatus === 'all-btn') {
            jobCountDisplay.innerText = `${totalAllCards} of ${totalAllCards} jobs`;
        }
        else if (currentStatus === 'interview-btn') {
            jobCountDisplay.innerText = `${interviewList.length} of ${totalAllCards} jobs`;
        }
        else if (currentStatus === 'rejected-btn') {
             jobCountDisplay.innerText = `${rejectedList.length} of ${totalAllCards} jobs`;
        }
    }
}


calculateCount();

// troggoling

function toggleStyle(id) {

    allBtn.classList.add('bg-white','text-[#64748B]');
    interviewBtn.classList.add('bg-white','text-[#64748B]');
    rejectedBtn.classList.add('bg-white','text-[#64748B]');
    

    allBtn.classList.remove('bg-[#3B82F6]','text-white');
    interviewBtn.classList.remove('bg-[#3B82F6]','text-white');
    rejectedBtn.classList.remove('bg-[#3B82F6]','text-white');


    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.remove('bg-white','text-[#64748B]');
    selected.classList.add('bg-[#3B82F6]','text-white');


    
    if (id == 'interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        rendering();
    }
    else if (id == 'all-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id == 'rejected-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        rendering2();
    }
    calculateCount();
}


// delegation

mainContainer.addEventListener('click', function (event) {

   
    if (event.target.classList.contains('card-interview-btn')) 
        {
        const parentNode = event.target.parentNode.parentNode;

        const company = parentNode.querySelector('.company').innerText;
        const post = parentNode.querySelector('.post').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const postDSC = parentNode.querySelector('.postDSC').innerText;

        updateStatusInAllCards(company, 'INTERVIEW');

        const cardInfo = { company, post, salary, postDSC };

        const exist = interviewList.find(item => item.company == cardInfo.company);
        if (!exist) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.company != cardInfo.company);

        if (currentStatus == 'rejected-btn') 
        {
         rendering2();
        }
        if (currentStatus == 'interview-btn') 
        {
         rendering();
       }

        calculateCount();
    }
    else if (event.target.classList.contains('card-reject-btn')) 
    {
        const parentNode = event.target.parentNode.parentNode;

        const company = parentNode.querySelector('.company').innerText;
        const post = parentNode.querySelector('.post').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const postDSC = parentNode.querySelector('.postDSC').innerText;

        updateStatusInAllCards(company, 'REJECTED');

        const cardInfo = { company, post, salary, postDSC };

        const exist = rejectedList.find(item => item.company == cardInfo.company);
        if (!exist) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.company != cardInfo.company);

        if (currentStatus == 'interview-btn') 
        {
          rendering();
        }
        if (currentStatus == 'rejected-btn') 
        {
         rendering2();
        }

        calculateCount();
    }

    else if (event.target.closest('.fa-trash-can')) 
        {
        const cardElement = event.target.closest('.card');
        const company = cardElement.querySelector('.company').innerText;
        const allCards = allCardSection.querySelectorAll('.card');
        allCards.forEach(c => {
            if (c.querySelector('.company').innerText === company) c.remove();
        });
        interviewList = interviewList.filter(item => item.company != company);
        rejectedList = rejectedList.filter(item => item.company != company);

        if (currentStatus == 'interview-btn') 
        {
          rendering();
        }
        if (currentStatus == 'rejected-btn') 
        {
         rendering2();
        }

        calculateCount();
    }
});


//  update status 

function updateStatusInAllCards(company, status) 
{
    const cards = allCardSection.querySelectorAll('.card');
    
    cards.forEach(card => {
        if (card.querySelector('.company').innerText === company) {
            const interviewBadge = card.querySelector('.interview-badge');
            const rejectedBadge = card.querySelector('.rejected-badge');
            if(interviewBadge)
            {
              interviewBadge.classList.add('hidden');
            }
            if(rejectedBadge) 
            {
              rejectedBadge.classList.add('hidden');
            }
            if (status === 'INTERVIEW' && interviewBadge) 
            {
                interviewBadge.classList.remove('hidden');
            } 
            else if (status === 'REJECTED' && rejectedBadge) 
            {
                rejectedBadge.classList.remove('hidden');
            }
        }
    });
}


// randering

function rendering() {
    filterSection.innerHTML = '';
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
        <div class="text-center py-16">
            <img src="./jobs.png" alt="" class="mx-auto block mb-4 w-32>
            <h2 class="text-2xl font-semibold text-[#002C5C]">No jobs available</h2>
            <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>`;
        return;
    }
    for (let interviewData of interviewList) {
        let div = document.createElement('div');
        div.className = 'card bg-white shadow flex justify-between p-6 mb-4';
        div.innerHTML = `
          <div class="space-y-4">
                <h3 class="company font-semibold text-[18px]">${interviewData.company}</h3>
                <p class="post text-[16px] text-[#64748B]">${interviewData.post}</p>
                <p class="salary text-[14px] text-[#64748B]">${interviewData.salary}</p>
                <button class="applyBtn rounded font-medium text-[14px] bg-[#D1FAE5] px-3 py-2 text-green-700 border">INTERVIEW</button>
                <p class="postDSC text-[14px] text-[#323B49]">${interviewData.postDSC}</p>
                <div class="flex gap-2">
                    <button class="card-interview-btn border border-[#10B981] px-3 py-2 text-green-500 font-semibold text-[14px] rounded">INTERVIEW</button>
                    <button class="card-reject-btn border border-[#EF4444] px-3 py-2 text-[#EF4444] rounded font-semibold text-[14px]">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="p-2 rounded-full opacity-35 border border-gray-400"><i class="fa-solid fa-trash-can"></i></button>
            </div>`;
        filterSection.appendChild(div);
    }
}


function rendering2() {
    filterSection.innerHTML = '';
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
        <div class="text-center py-16">
            <img src="./jobs.png" alt="" class="mx-auto block mb-4 w-32>
            <h2 class="text-2xl font-semibold text-[#002C5C]">No jobs available</h2>
            <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>`;
        return;
    }
    for (let rejectedData of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card bg-white shadow flex justify-between p-6 mb-4';
        div.innerHTML = `
          <div class="space-y-4">
                <h3 class="company font-semibold text-[18px]">${rejectedData.company}</h3>
                <p class="post text-[16px] text-[#64748B]">${rejectedData.post}</p>
                <p class="salary text-[14px] text-[#64748B]">${rejectedData.salary}</p>
                <button class="applyBtn rounded font-medium text-[14px] bg-[#FEE2E2] px-3 py-2 text-red-700 border">REJECTED</button>
                <p class="postDSC text-[14px] text-[#323B49]">${rejectedData.postDSC}</p>
                <div class="flex gap-2">
                    <button class="card-interview-btn border border-[#10B981] px-3 py-2 text-green-500 font-semibold text-[14px] rounded">INTERVIEW</button>
                    <button class="card-reject-btn border border-[#EF4444] px-3 py-2 text-[#EF4444] rounded font-semibold text-[14px]">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="p-2 rounded-full opacity-35 border border-gray-400"><i class="fa-solid fa-trash-can"></i></button>
            </div>`;
        filterSection.appendChild(div);
    }
}