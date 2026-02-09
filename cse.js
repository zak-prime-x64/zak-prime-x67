// --- Student Data Array (50 Students) ---
const studentData = [];
const groupName = "Computer Science";

// Helper arrays for generating realistic-sounding data
const names = [
    "Mustak", "Zaki Hussain", "Afzal", "M.D Rehan", "J.veeresh",
    "Rahman Shafi", "Abdullah", "Aman", "Khaja", "Maruti",
    "Abhishek", "Karthik", "Akash", "Abdul Rahman", "Rahman",
    "Sameer", "Sa-Power", "Abhinav Topper", "Sai", "Om Sai",
    "Gorilla Goud", "Vignesh", "Wasey", "Zeeshan", "Saif",
    "Suhan", "Inayath", "Akbar", "Abdul Rehan", "Srikanth",
    "Sai Charan", "GFC Topper", "Nandini Iyer", "Prateek Sood", "Esha Singhania",
    "Rehan Sheikh", "Kavya Murthy", "Gautam Puri", "Swati Saxena", "Balraj Gill",
    "Divya Chakra", "Omkar Bhide", "Pooja Hegde", "Ashish Rawat", "Sneha Kumari",
    "Alok Rangan", "Trisha Roy", "Vinay Goswami", "Jasmine Kaur", "Hiten Modi"
];

// Function to generate a random 4-digit admission year and 3-digit number
const generateAdmissionNumber = (index) => {
    const year = new Date().getFullYear() - 1; // Assuming admission last year
    const num = String(100 + index).padStart(3, '0');
    return `CS${year}-${num}`;
};

// Function to get a random attendance percentage
const getRandomAttendance = () => {
    return (Math.random() * (100 - 65) + 65).toFixed(1); // Between 65.0% and 100.0%
};

// Function to get a random behavior
const getRandomBehavior = () => {
    const behaviors = ["Excellent", "Good", "Satisfactory", "Needs Improvement"];
    const weights = [0.4, 0.35, 0.2, 0.05]; // Weighted to favor 'Excellent' and 'Good'
    let sum = 0;
    const r = Math.random();
    for (let i = 0; i < behaviors.length; i++) {
        sum += weights[i];
        if (r < sum) {
            return behaviors[i];
        }
    }
    return behaviors[0]; // Fallback
};

// Populate the studentData array for 50 students
for (let i = 0; i < 50; i++) {
    studentData.push({
        sno: i + 1,
        group: groupName,
        name: names[i] || `Student ${i + 1}`, // Use names array or fallback
        admissionNo: generateAdmissionNumber(i + 1),
        attendance: getRandomAttendance(),
        contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`, // Random 10-digit number
        behavior: getRandomBehavior()
    });
}

// --- Dynamic Table Generation ---

const tableBody = document.querySelector('#studentTable tbody');

studentData.forEach(student => {
    // Determine CSS class for attendance based on value
    let attnClass = 'attn-high';
    if (parseFloat(student.attendance) < 75) {
        attnClass = 'attn-low';
    } else if (parseFloat(student.attendance) < 85) {
        attnClass = 'attn-medium';
    }

    // Determine CSS class for behavior
    const behaviorClass = student.behavior.toLowerCase().replace(' ', '-');

    // Create the table row element
    const row = tableBody.insertRow();
    
    // Add cells (td) to the row
    
    // 1. S.no
    let cell = row.insertCell();
    cell.setAttribute('data-label', 'S.No');
    cell.textContent = student.sno;
    
    // 2. Group
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Group');
    cell.classList.add('group-cell', 'mobile-hidden');
    cell.textContent = student.group;
    
    // 3. Student Name
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Student Name');
    cell.textContent = student.name;

    // 4. Admission Number
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Admission No.');
    cell.textContent = student.admissionNo;

    // 5. Attendance Percentage
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Attendance %');
    cell.classList.add(attnClass);
    cell.textContent = `${student.attendance}%`;

    // 6. Contact Number
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Contact Number');
    cell.classList.add('mobile-hidden');
    cell.textContent = student.contact;
    
    // 7. Behaviour (Styled as a "Pill")
    cell = row.insertCell();
    cell.setAttribute('data-label', 'Behaviour');
    cell.classList.add('behavior-cell');
    cell.innerHTML = `<span class="${behaviorClass}">${student.behavior}</span>`;
});