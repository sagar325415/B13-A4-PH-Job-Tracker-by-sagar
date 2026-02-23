let interviewList = []
let rejectedList = []
let currentStatus = 'all-btn'

let Total = document.getElementById('Total')
let rejected = document.getElementById('rejected')
let interview = document.getElementById('interview')

const mainContainer = document.querySelector('main')
const allCardSection = document.getElementById('allCards')
const filterSection = document.getElementById('filtered-section')

const allBtn = document.getElementById('all-btn')
const interviewBtn = document.getElementById('interview-btn')
const rejectedBtn = document.getElementById('rejected-btn')

function calculateCount() {
    Total.innerText = allCardSection.children.length
    rejected.innerText = rejectedList.length
    interview.innerText = interviewList.length
}
calculateCount()

function toggleStyle(id) {
    allBtn.classList.add('bg-white', 'text-[#64748B]')
    interviewBtn.classList.add('bg-white', 'text-[#64748B]')
    rejectedBtn.classList.add('bg-white', 'text-[#64748B]')

    allBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    const selected = document.getElementById(id)
    currentStatus = id

    selected.classList.remove('bg-white', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if (id == 'interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        rendering()
    }
    else if (id == 'all-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    }
    else if (id == 'rejected-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        rendering2()
    }
}

mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('card-interview-btn')) {
        const parentNode = event.target.parentNode.parentNode

        const company = parentNode.querySelector('.company').innerText;
        const post = parentNode.querySelector('.post').innerText
        const salary = parentNode.querySelector('.salary').innerText
        const postDSC = parentNode.querySelector('.postDSC').innerText

        
        parentNode.querySelector('.applyBtn').innerText = 'INTERVIEW'

        const cardInfo = {
            company,
            post,
            salary,
            applyBtn: 'INTERVIEW',
            postDSC,
        }

        const exist = interviewList.find(item => item.company == cardInfo.company)
        if (!exist) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.company != cardInfo.company)

        if (currentStatus == 'rejected-btn') {
            rendering2();
        }
        calculateCount()
    }

    else if (event.target.classList.contains('card-reject-btn')) {
        const parentNode = event.target.parentNode.parentNode

        const company = parentNode.querySelector('.company').innerText;
        const post = parentNode.querySelector('.post').innerText
        const salary = parentNode.querySelector('.salary').innerText
        const postDSC = parentNode.querySelector('.postDSC').innerText

       
        parentNode.querySelector('.applyBtn').innerText = 'REJECTED'

        const cardInfo = {
            company,
            post,
            salary,
            applyBtn: 'REJECTED',
            postDSC,
        }

        const exist = rejectedList.find(item => item.company == cardInfo.company)
        if (!exist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.company != cardInfo.company)

        if (currentStatus == 'interview-btn') {
            rendering();
        }
        calculateCount()
    }
    
    else if (event.target.closest('.fa-trash-can')) {
        const parentNode = event.target.closest('.card')
        const company = parentNode.querySelector('.company').innerText;

        // UI theke remove
        parentNode.remove();

        // Array theke remove
        interviewList = interviewList.filter(item => item.company != company);
        rejectedList = rejectedList.filter(item => item.company != company);

        // Filtered view render thakle update hobe
        if (currentStatus == 'interview-btn') rendering();
        if (currentStatus == 'rejected-btn') rendering2();

        calculateCount()
    }
})

function rendering() {
    filterSection.innerHTML = ''


    // shurte interview kali takle eta dekabe
   if (interviewList.length === 0) {
    filterSection.innerHTML = `
    <div class="text-center py-16">

        <i class="fa-solid fa-file-lines fa-5x mb-4" style="color:#7DA8FF;"></i>
        <h2 class="text-xl font-semibold text-[#002C5C]">No Jobs Available</h2>
        <p class="text-gray-500">You haven't marked any job as Interview yet.</p>
    </div>`;
    calculateCount();
    return;
}
    for (let interviewData of interviewList) {
        let div = document.createElement('div');
        div.className = 'card bg-white shadow flex justify-between p-6 mb-4'
        div.innerHTML = `
          <div class=" space-y-4 ">
                <h3 class="company font-semibold text-[18px]">${interviewData.company}</h3>
                <p class="post text-[16px] text-[#64748B]">${interviewData.post}</p>
                <p class="salary text-[14px] text-[#64748B]">${interviewData.salary}</p>
                <button class=" applyBtn rounded font-medium text-[14px] bg-[#D1FAE5] px-3 py-2 text-green-700">INTERVIEW</button>
                <p class=" postDSC text-[14px] text-[#323B49]">${interviewData.postDSC}</p>
                <div class="flex gap-2">
                    <button class="card-interview-btn border border-[#10B981] px-3 py-2 text-green-500 font-semibold text-[14px] rounded">INTERVIEW</button>
                    <button class="card-reject-btn border border-[#EF4444] px-3 py-2 text-[#EF4444] rounded font-semibold text-[14px]">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="p-2 rounded-full opacity-35 border border-gray-400"><i class="fa-solid fa-trash-can"></i></button>
            </div>`
        filterSection.appendChild(div)
    }
}

function rendering2() {
    filterSection.innerHTML = ''


    // shurte interview kali takle eta dekabe
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
        <div class="text-center py-16">
              <i class="fa-solid fa-file-lines fa-5x mb-4" style="color:#7DA8FF;"></i>
            <h2 class="text-xl font-semibold text-[#002C5C]">No Jobs Available</h2>
            <p class="text-gray-500">You haven't marked any job as rejected yet.</p>
        </div>`
        calculateCount()
        return;
    }

    for (let rejectedData of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card bg-white shadow flex justify-between p-6 mb-4'
        div.innerHTML = `
          <div class=" space-y-4 ">
                <h3 class="company font-semibold text-[18px]">${rejectedData.company}</h3>
                <p class="post text-[16px] text-[#64748B]">${rejectedData.post}</p>
                <p class="salary text-[14px] text-[#64748B]">${rejectedData.salary}</p>
                <button class=" applyBtn rounded font-medium text-[14px] bg-[#FEE2E2] px-3 py-2 text-red-700">REJECTED</button>
                <p class=" postDSC text-[14px] text-[#323B49]">${rejectedData.postDSC}</p>
                <div class="flex gap-2">
                    <button class="card-interview-btn border border-[#10B981] px-3 py-2 text-green-500 font-semibold text-[14px] rounded">INTERVIEW</button>
                    <button class="card-reject-btn border border-[#EF4444] px-3 py-2 text-[#EF4444] rounded font-semibold text-[14px]">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="p-2 rounded-full opacity-35 border border-gray-400"><i class="fa-solid fa-trash-can"></i></button>
            </div>`
        filterSection.appendChild(div)
    }
}

