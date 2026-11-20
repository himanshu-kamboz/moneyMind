const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

if (savedProfile) {

    const name = document.querySelector('#sidebarName');
    const avatar = document.querySelector('#sidebarAvatar');

    const initials = savedProfile.fullName
        .trim()
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    if (name) name.textContent = savedProfile.fullName;
    if (avatar) avatar.textContent = initials;
}