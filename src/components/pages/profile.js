import React, { useState, useEffect } from 'react';
import { createProfile, getProfileById, updateProfile } from '../../services/index'; // Import the API functions
import { toast } from 'react-toastify'

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [githubURL, setGithubURL] = useState('');
  const [resumeURL, setResumeURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setprofileExists] = useState(false)

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    getProfile(userId)
      .then(profile => {
        if (profile) {
          setName(profile.name);
          setEmail(profile.email);
          setPhone(profile.phone);
          setBatch(profile.batch);
          setEducation(profile.education);
          setExperience(profile.experience);
          setGithubURL(profile.githubURL);
          setResumeURL(profile.resumeURL);
        } else {
          setDefaultFieldValues();
        }
      })
      .catch(() => {
        setDefaultFieldValues();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getProfile = async (userId) => {
    try {
      const profile = await getProfileById(userId);
      setprofileExists(true)
      return profile;
    } catch (error) {
      setprofileExists(false)
      throw error;
    }
  };

  const setDefaultFieldValues = () => {
    setName('');
    setEmail('');
    setPhone('');
    setBatch('');
    setEducation('');
    setExperience('');
    setGithubURL('');
    setResumeURL('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem('user_id');

    const profileData = {
      name,
      email,
      phone,
      batch,
      userId,
      education,
      experience,
      githubURL,
      resumeURL
    };

    try {
      if (!profileExists) {
        await createProfile(profileData);
        toast.success('Profile created successfully');
      } else {
        await updateProfile(userId, profileData);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to save profile');
      console.error('Failed to save profile', error);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <div>
        <h1 className="mt-5">Profile</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form className="mt-4" style={{ width: '40vw' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="batch">Batch</label>
              <input
                type="text"
                className="form-control"
                id="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              />
            </div>

            <h2 className="mt-4">Qualification</h2>

            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input
                type="text"
                className="form-control"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                className="form-control"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>

            <h2 className="mt-4">URLs</h2>

            <div className="form-group">
              <label htmlFor="github">GitHub URL</label>
              <input
                type="text"
                className="form-control"
                id="github"
                value={githubURL}
                onChange={(e) => setGithubURL(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume URL</label>
              <input
                type="text"
                className="form-control"
                id="resume"
                value={resumeURL}
                onChange={(e) => setResumeURL(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={
                name === '' ||
                email === '' ||
                phone === '' ||
                batch === '' ||
                education === '' ||
                experience === '' ||
                githubURL === '' ||
                resumeURL === ''
              }
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
