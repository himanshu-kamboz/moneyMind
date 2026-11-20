const profileSection = document.querySelector('#profile');

if (profileSection) {

    const profileInputs = profileSection.querySelectorAll('.profile-fields input');
    const editButton = profileSection.querySelector('.settings-save button');
    const profileName = profileSection.querySelector('.profile-summary strong');
    const profileAvatar = profileSection.querySelector('.profile-avatar');
    const sidebarName = document.querySelector('#sidebarName');
    const sidebarAvatar = document.querySelector('#sidebarAvatar');

    const defaultProfile = {
        fullName: profileInputs[0].value,
        email: profileInputs[1].value,
        username: profileInputs[2].value
    };

    function getProfile() {

        try {
            return JSON.parse(localStorage.getItem('userProfile')) || defaultProfile;
        } catch (error) {
            console.error('Error loading profile:', error);
            return defaultProfile;
        }

    }


    function saveProfile(profile) {

        localStorage.setItem('userProfile', JSON.stringify(profile));

    }

    function displayProfile() {

    const profile = getProfile();

    // Update input fields
    profileInputs[0].value = profile.fullName;
    profileInputs[1].value = profile.email;
    profileInputs[2].value = profile.username;

    // Generate initials
    const initials = profile.fullName
        .trim()
        .split(/\s+/)
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();

    // Update settings profile
    profileName.textContent = profile.fullName;
    profileAvatar.textContent = initials;

    // Update sidebar profile
    if (sidebarName) {
        sidebarName.textContent = profile.fullName;
    }

    if (sidebarAvatar) {
        sidebarAvatar.textContent = initials;
    }

}

    function disableEditing() {

        profileInputs.forEach(input => {
            input.readOnly = true;
        });

        editButton.textContent = 'Edit Profile';

    }

    function enableEditing() {

        profileInputs.forEach(input => {
            input.readOnly = false;
        });

        editButton.textContent = 'Save Profile';

        profileInputs[0].focus();

    }

    editButton.addEventListener('click', function () {

        const isEditing = editButton.textContent === 'Save Profile';

        if (!isEditing) {

            enableEditing();

        } else {

            const fullName = profileInputs[0].value.trim();
            const email = profileInputs[1].value.trim();
            const username = profileInputs[2].value.trim();

            if (!fullName || !email || !username) {
                alert('Please fill in all fields.');
                return;
            }

            if (!profileInputs[1].checkValidity()) {
                alert('Please enter a valid email address.');
                return;
            }

            const updatedProfile = {
                fullName: fullName,
                email: email,
                username: username
            };

            saveProfile(updatedProfile);

            displayProfile();

            disableEditing();

            alert('Profile updated successfully!');

        }

    });

    displayProfile();

    disableEditing();

}