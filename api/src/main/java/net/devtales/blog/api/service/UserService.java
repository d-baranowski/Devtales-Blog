package net.devtales.blog.api.service;

import com.google.common.collect.Sets;
import net.devtales.blog.api.model.Role;
import net.devtales.blog.api.model.User;
import net.devtales.blog.api.repository.RoleRepository;
import net.devtales.blog.api.repository.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Profile("dev")
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        createUser("admin", "password", "ADMIN");
    }

    public void createUser(String username, String password, String role) {
        User admin = new User();
        Role adminRole = new Role();
        adminRole.setName(role);
        admin.setRoles(Sets.newHashSet(adminRole));
        admin.username = username;
        admin.password = new BCryptPasswordEncoder().encode(password);
        userRepository.save(admin);
    }

    public void save(User user) {
        user.password = bCryptPasswordEncoder.encode(user.password);
        user.setRoles(new HashSet<>(roleRepository.findAll()));
        userRepository.save(user);
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
