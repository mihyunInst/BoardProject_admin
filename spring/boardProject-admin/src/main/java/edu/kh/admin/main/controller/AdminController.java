package edu.kh.admin.main.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.admin.main.model.dto.Board;
import edu.kh.admin.main.model.dto.Member;
import edu.kh.admin.main.model.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
@Slf4j
public class AdminController {
	
	private final AdminService service;
	
	/** 관리자 로그인
	 * @param inputMember
	 * @return
	 */
	@PostMapping("login")
	public Member login(@RequestBody Member inputMember,
						Model model) {
		
		Member loginMember = service.login(inputMember);
		
		if(loginMember == null) {
			return null;
		}
		
		model.addAttribute(loginMember);
		return loginMember;
	}
	
	/** 관리자 로그아웃
	 * @param session
	 * @return
	 */
	@GetMapping("logout")
	public int logout(HttpSession session) {
		session.invalidate();
		
		return 1;
	}
	
	/** 탈퇴한 회원 목록 조회
	 * @return
	 */
	@GetMapping("withdrawnMemberList")
	public List<Member> selectWithdrawnMemberList() {
		return service.selectWithdrawnMemberList();
	}
	
	/** 탈퇴 회원 복구
	 * @param member
	 * @return
	 */
	@PutMapping("restoreMember")
	public int restoreMember(@RequestBody Member member) {
		return service.restoreMember(member.getMemberNo());
	}
	
	/** 삭제된 게시글 목록 조회
	 * @return
	 */
	@GetMapping("deleteBoardList")
	public List<Board> selectDeleteBoardList() {
		return service.selectDeleteBoardList();
	}
	
	/** 삭제된 게시글 복구
	 * @param board
	 * @return
	 */
	@PutMapping("restoreBoard")
	public int restoreBoard(@RequestBody Board board) {
		return service.restoreBoard(board.getBoardNo());
	}
	
	/** 게시글 최대 조회 수
	 * @return
	 */
	@GetMapping("maxReadCount")
	public Board maxReadCount() {
		return service.maxReadCount();
	}
	
	/** 게시글 최대 좋아요 수
	 * @return
	 */
	@GetMapping("maxLikeCount")
	public Board maxLikeCount() {
		return service.maxLikeCount();
	}
	
	
	/** 게시글 최대 댓글 수
	 * @return 
	 */
	@GetMapping("maxCommentCount")
	public Board maxCommentCount() {
		return service.maxCommentCount();
	}
	
	/** 관리자 계정 발급
	 * @return
	 */
	@PostMapping("signUp")
	public String adminSignUp(@RequestBody Member member) {
		
		String result = service.adminSignUp(member);
		
		return result;
	}
	
	/** 관리자 계정 목록
	 * @return
	 */
	@GetMapping("adminAccountList")
	public List<Member> adminAccountList() {
		return service.adminAccountList();
	}
}
